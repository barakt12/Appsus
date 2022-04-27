const gMailsToDisplay = [
    {
        id: 'e1015',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com'
    },
    {
        id: 'e1025',
        subject: 'I LOVE YOU!',
        body: 'love you babe',
        isRead: true,
        sentAt: Date.now(),
        to: 'puki@puki.com'
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