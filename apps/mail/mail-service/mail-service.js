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
}

const KEY = 'mailsDB'

const gLoggedInUser = {
    email: 'user@appsus.com',
}

const gMailsToDisplay = [
    {
        id: 'e1015',
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
        id: 'e1025',
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
        id: 'e1035',
        subject: 'Something Longggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
        body: 'Something Long',
        isRead: true,
        sentAt: Date.now(),
        to: 'shuki@shuki.com',
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
    if (!newMail.to) return
    getMailById(newMail.id).then(mail => {
        mail.subject = newMail.subject || ''
        mail.body = newMail.body || ''
        mail.sentAt = newMail.sentAt || ''
        mail.to = newMail.to || ''
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