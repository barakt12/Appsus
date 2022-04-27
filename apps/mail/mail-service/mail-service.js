import { storageService } from '../../../services/storage.service.js'

export const mailService = {
    query,
    toggleMarkMail,
}

const KEY = 'mailsDB'

const gMailsToDisplay = [
    {
        id: 'e1015',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        isMarked: true
    },
    {
        id: 'e1025',
        subject: 'I LOVE YOU!',
        body: 'love you babe',
        isRead: true,
        sentAt: Date.now(),
        to: 'puki@puki.com',
        isMarked: false,
    },
    {
        id: 'e1035',
        subject: 'Something Longggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
        body: 'Something Long',
        isRead: true,
        sentAt: Date.now(),
        to: 'shuki@shuki.com',
        isMarked: true,
    },
]

function query(filterBy) {
    let mails = _loadFromStorage() || gMailsToDisplay
    if (!mails || !mails.length) {
        mails = gDefaultBooks
        _saveToStorage(mails)
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

function updateMail(currMail) {
    query().then(mails => mails.map(mail => {
        if (currMail.id === mail.id) return currMail
        return mail
    })).then(mails => {
        _saveToStorage(mails)
    })
}

function getMailById(mailId) {
    const mails = _loadFromStorage() || gMailsToDisplay
    const mail = mails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)
}


function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}