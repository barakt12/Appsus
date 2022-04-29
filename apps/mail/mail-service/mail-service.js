import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    toggleMarkMail,
    deleteMail,
    toggleReadMail,
    addDraftMail,
    autoSaveDraft,
    getLoggedInUserMail,
    sendMail,
    getInboxUnreadMails,
}

const KEY = 'mailsDB'

const gLoggedInUser = {
    email: 'user@appsus.com',
}

const gMailsToDisplay = [
    {
        id: 'v5000',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: Date.now(),
        to: 'user@appsus.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5001',
        subject: 'I LOVE YOU!',
        body: 'love you babe',
        isRead: true,
        sentAt: Date.now(),
        to: 'puki@puki.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5002',
        subject: '♥♥♥♥♥',
        body: `I hope that you are all well and I am loving the pictures of the boys. They are growing so fast. \nRight now we are in Colorado visiting our children. \nIt is always a fun visit. I’\ll post pictures when we get back home next week. \nI miss you all, COME VISIT US!!!!! \nWith love always`,
        isRead: true,
        sentAt: Date.now(),
        to: 'user@appsus.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5003',
        subject: 'Something Longggggggggggggggggggggggggggggggggggggggggggg',
        body: 'Something Long',
        isRead: true,
        sentAt: Date.now(),
        to: 'shuki@shuki.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5004',
        subject: 'Your free trial is over',
        body: 'Your Avocode free trial is over! \nPlease log in and purchase a subscription within 14 days to keep working on your design projects',
        isRead: true,
        sentAt: new Date(2022, 6, 11).getTime(),
        to: 'user@appsus.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5005',
        subject: 'Account confirmation',
        body: 'Learn the fundamentals with this tutorial – and see what else you can do for free',
        isRead: true,
        sentAt: new Date(2022, 5, 10).getTime(),
        to: 'user@appsus.com',
        isMarked: false,
        isTrash: true,
        isDraft: false,
    },
    {
        id: 'v5006',
        subject: 'you and 110 others made changes in your shared folders',
        body: 'Follow folders to get more detailed insights, reported instantly or once per day.',
        isRead: true,
        sentAt: new Date(2021, 7, 7).getTime(),
        to: 'user@appsus.com',
        isMarked: false,
        isTrash: true,
        isDraft: false,
    },
    {
        id: 'v5007',
        subject: 'A first-party GitHub OAuth application has been added to your account',
        body: 'A first-party GitHub OAuth application (Git Credential Manager) with gist, repo, and workflow scopes was recently authorized to access your account. \nVisit us for more information',
        isRead: true,
        sentAt: new Date(2020, 5, 12).getTime(),
        to: 'user@appsus.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5008',
        subject: 'Order 3015055440704238 is good to go!',
        body: 'Hi you!, \nThe payment for order 3015055440704238 has been confirmed! We\'ll let you know when your order ships',
        isRead: true,
        sentAt: new Date(2022, 0, 11).getTime(),
        to: 'user@appsus.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
]

function addDraftMail(draft) {
    let mails = _loadMailsFromStorage() || gMailsToDisplay
    mails.unshift(_createDraft(draft))
    _saveMailsToStorage(mails)
}

function autoSaveDraft(newDraft) {
    getMailById(newDraft.id).then(draft => {
        draft.subject = newDraft.subject || ''
        draft.body = newDraft.body || ''
        draft.sentAt = newDraft.sentAt || ''
        draft.to = newDraft.to || ''
        updateMail(draft)
    })
}

function sendMail(newMail) {
    getMailById(newMail.id).then(mail => {
        mail.subject = newMail.subject || ''
        mail.body = newMail.body || ''
        mail.sentAt = newMail.sentAt || ''
        mail.to = newMail.to || 'UNKNOWN'
        mail.isDraft = false
        updateMail(mail)
    })
}

function query(filterBy) {
    let mails = _loadMailsFromStorage() || gMailsToDisplay
    if (!mails || !mails.length) {
        mails = gMailsToDisplay
        _saveMailsToStorage(mails)
    }

    if (filterBy) {
        let { isRead, searchInp } = filterBy
        mails = mails.filter(mail => {
            if (isRead !== false && !isRead) isRead = mail.isRead
            return (
                mail.subject.toLowerCase().includes(searchInp.toLowerCase()) || mail.body.toLowerCase().includes(searchInp.toLowerCase()) &&
                mail.isRead === isRead)
        })
    }

    return Promise.resolve(mails)
}

function toggleMarkMail(mailId) {
    return getMailById(mailId).then(mail => {
        mail.isMarked = !mail.isMarked
        updateMail(mail)
        return Promise.resolve(mail)
    })
}

function toggleReadMail(mailId, isRead) {
    console.log('id-from-read-mail', mailId, isRead)
    return getMailById(mailId).then(mail => {
        if (isRead) {
            mail.isRead = true
            console.log(mail)
        }
        else { mail.isRead = !mail.isRead }
        updateMail(mail)
        return Promise.resolve(mail)
    })
}

function deleteMail(mailId) {
    return getMailById(mailId).then(mail => {
        if (!mail.isTrash) {
            mail.isTrash = true
            updateMail(mail)
            return Promise.resolve(mail)
        } else {
            let mails = _loadMailsFromStorage() || gMailsToDisplay
            mails = mails.filter(mail => mail.id !== mailId)
            _saveMailsToStorage(mails)
            return Promise.resolve(mails)
        }
    })
}

function updateMail(currMail) {
    query().then(mails => mails.map(mail => {
        if (currMail.id === mail.id) return currMail
        return mail
    })).then(mails => {
        _saveMailsToStorage(mails)
    })
}

function getMailById(mailId) {
    const mails = _loadMailsFromStorage() || gMailsToDisplay
    const mail = mails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)
}

function getInboxUnreadMails() {
    const mails = _loadMailsFromStorage() || gMailsToDisplay
    let count = 0
    mails.forEach(mail => { if (!mail.isRead && mail.to === getLoggedInUserMail()) count++ })
    return count
}

function getLoggedInUserMail() {
    return gLoggedInUser.email
}


function _saveMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadMailsFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function _createDraft(draft) {
    return {
        id: draft.id,
        subject: draft.subject || '',
        body: draft.body || '',
        isRead: false,
        sentAt: Date.now(), // TODO - editAt
        to: draft.to || '',
        isMarked: false,
        isTrash: false,
        isDraft: true,
    }
}