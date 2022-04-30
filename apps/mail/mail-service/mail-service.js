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
    getMailById,
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
        from: 'daniella@aharon.com',
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
        to: 'avi@peled.com',
        from: 'user@appsus.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5002',
        subject: '♡♡♡♡♡',
        body: `I hope that you are all well and I am loving the pictures of the boys. They are growing so fast. \nRight now we are in Colorado visiting our children. \nIt is always a fun visit. I’\ll post pictures when we get back home next week. \nI miss you all, COME VISIT US!!!!! \nWith love always`,
        isRead: false,
        sentAt: Date.now(),
        to: 'user@appsus.com',
        from: 'bar@shinfeld.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5003',
        subject: 'To Do List',
        body: 'go to su',
        isRead: true,
        sentAt: Date.now(),
        to: 'lea@einav.com',
        from: 'user@appsus.com',
        isMarked: true,
        isTrash: false,
        isDraft: true,
    },
    {
        id: 'v5004',
        subject: 'Your free trial is over',
        body: 'Your Avocode free trial is over! \nPlease log in and purchase a subscription within 14 days to keep working on your design projects',
        isRead: true,
        sentAt: new Date(2022, 3, 29).getTime(),
        to: 'user@appsus.com',
        from: 'artur@cohen.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5005',
        subject: 'Account confirmation',
        body: 'Learn the fundamentals with this tutorial – and see what else you can do for free',
        isRead: true,
        sentAt: new Date(2022, 3, 28).getTime(),
        to: 'meni@shmuel.com',
        from: 'user@appsus.com',
        isMarked: false,
        isTrash: true,
        isDraft: false,
    },
    {
        id: 'v5006',
        subject: 'you and 110 others made changes in your shared folders',
        body: 'Follow folders to get more detailed insights, reported instantly or once per day.',
        isRead: true,
        sentAt: new Date(2022, 3, 23).getTime(),
        to: 'user@appsus.com',
        from: 'eli@cohen.com',
        isMarked: false,
        isTrash: true,
        isDraft: false,
    },
    {
        id: 'v5007',
        subject: 'A first-party GitHub OAuth application has been added to your account',
        body: 'A first-party GitHub OAuth application (Git Credential Manager) with gist, repo, and workflow scopes was recently authorized to access your account. \nVisit us for more information',
        isRead: true,
        sentAt: new Date(2022, 3, 12).getTime(),
        to: 'user@appsus.com',
        from: 'noa@levi.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5008',
        subject: 'Order 3015055440704238 is good to go!',
        body: 'Hi you! \nThe payment for order 3015055440704238 has been confirmed! We\'ll let you know when your order ships',
        isRead: true,
        sentAt: new Date(2022, 3, 2).getTime(),
        to: 'user@appsus.com',
        from: 'shani@buskila.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5009',
        subject: 'Ionic liquid-based reservoir computing',
        body: 'Researchers have designed a tunable physical reservoir device based on the dielectric relaxation at an electrode-ionic liquid interface. Physical reservoir computing (PRC), which relies on the transient response of physical systems, is an attractive machine learning framework that can perform high-speed processing of time-series signals at low power. \nArtificial Intelligence (AI) is fast becoming ubiquitous in the modern society and will feature a broader implementation in the coming years. In applications involving sensors and internet-of-things devices, the norm is often edge AI, a technology in which the computing and analyses are performed close to the user (where the data is collected) and not far away on a centralized server. This is because edge AI has low power requirements as well as high-speed data processing capabilities, traits that are particularly desirable in processing time-series data in real time. \nTo address this issue, a research team from Japan involving Professor Kentaro Kinoshita and Sang-Gyu Koh, a PhD student, from the Tokyo University of Science, and senior researchers Dr. Hiroyuki Akinaga, Dr. Hisashi Shima, and Dr. Yasuhisa Naitoh from the National Institute of Advanced Industrial Science and Technology, proposed, in a new study published in Scientific Reports, the use of liquid PRC systems instead. "Replacing conventional solid reservoirs with liquid ones should lead to AI devices that can directly learn at the time scales of environmentally generated signals, such as voice and vibrations, in real time," explains Prof. Kinoshita. "Ionic liquids are stable molten salts that are completely made up of free-roaming electrical charges. The dielectric relaxation of the ionic liquid, or how its charges rearrange as a response to an electric signal, could be used as a reservoir and is holds much promise for edge AI physical computing."',
        isRead: true,
        sentAt: new Date(2022, 2, 28).getTime(),
        to: 'user@appsus.com',
        from: 'idan@mizrachi.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5010',
        subject: 'From blurry to bright',
        body: 'Biomedical engineers have developed an artificial intelligence (AI) training strategy to capture images of mouse brain cells in action. The researchers say the AI system, in concert with specialized ultra-small microscopes, make it possible to find precisely where and when cells are activated during movement, learning and memory. \nWhen a mouses head is restrained for imaging, its brain activity may not truly represent its neurological function, says Xingde Li, Ph.D., professor of biomedical engineering at the Johns Hopkins University School of Medicine. To map brain circuits that control daily functions in mammals, we need to see precisely what is happening among individual brain cells and their connections, while the animal is freely moving around, eating and socializing.',
        isRead: false,
        sentAt: new Date(2022, 2, 25).getTime(),
        to: 'user@appsus.com',
        from: 'eli@levi.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5011',
        subject: 'Researchers unveil a highly efficient means to reverse magnetization with spin currents',
        body: 'Researchers have established a low-cost method of magnetization reversal on perpendicularly magnetized ferromagnets. Not needing an external magnetic field, the method brings reverse magnetization closer to commercial viability. An international research team has achieved an important milestone in the quest for high density, low-power consuming nonvolatile magnetic memory.',
        isRead: false,
        sentAt: new Date(2022, 2, 20).getTime(),
        to: 'user@appsus.com',
        from: 'dana@pinchas.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5012',
        subject: 'New methods for visualizing small objects and artifacts',
        body: 'A new article presents step-by-step protocols for creating publishable 2D and 3D visualizations. The techniques will allow anyone to produce high-quality images and models with minimal effort and cost. \nThe ability to visually represent artefacts, whether inorganics like stone, ceramic and metal, or organics such as bone and plant material, has always been of great importance to the field of anthropology and archaeology. For researchers, educators, students and the public, the ability to see the past, not only read about it, offers invaluable insights into the production of cultural materials and the populations who made and used them. ',
        isRead: true,
        sentAt: new Date(2022, 2, 15).getTime(),
        to: 'user@appsus.com',
        from: 'michal@yanai.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5013',
        subject: 'A novel computing approach to recognizing chaos',
        body: 'A new paper proposes using the single nonlinear node delay-based reservoir computer to identify chaotic dynamics. \nChaos isn\'t always harmful to technology, in fact, it can have several useful applications if it can be detected and identified. \nChaos and its chaotic dynamics are prevalent throughout nature and through manufactured devices and technology. Though chaos is usually considered a negative, something to be removed from systems to ensure their optimal operation, there are circumstances in which chaos can be a benefit and can even have important applications. Hence a growing interest in the detection and classification of chaos in systems. \nA new paper published in EPJ B authored by Dagobert Wenkack Liedji and Jimmi Hervé Talla Mbé of the Research unit of Condensed Matter, Electronics and Signal Processing, Department of Physics, University of Dschang, Cameroon, and Godpromesse Kenné, from Laboratoire d\' Automatique et d\'Informatique Appliquée, Department of Electrical Engineering, IUT-FV Bandjoun, University of Dschang, Cameroon, proposes using the single nonlinear node delay-based reservoir computer to identify chaotic dynamics.',
        isRead: true,
        sentAt: new Date(2022, 2, 3).getTime(),
        to: 'user@appsus.com',
        from: 'shir@david.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5014',
        subject: 'Toward high-powered telecommunication systems',
        body: 'Researchers have developed a fully integrated high-power laser on a lithium niobate chip, paving the way for high-powered telecommunication systems, fully integrated spectrometers, optical remote sensing, and efficient frequency conversion for quantum networks, among other applications. \nFor all the recent advances in integrated lithium niobate photonic circuits -- from frequency combs to frequency converters and modulators -- one big component has remained frustratingly difficult to integrate: lasers. ',
        isRead: false,
        sentAt: new Date(2022, 1, 5).getTime(),
        to: 'user@appsus.com',
        from: 'eran@lasri.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5015',
        subject: 'Computerized, Rolling DNA Motors Move Molecular Robotics to Next Level',
        body: 'Chemists integrated computer functions into rolling DNA-based motors, opening a new realm of possibilities for miniature, molecular robots. These DNA-based motors combine computational power with the  ability to burn fuel and move in an intentional direction.',
        isRead: true,
        sentAt: new Date(2022, 0, 7).getTime(),
        to: 'user@appsus.com',
        from: 'itamar@shaul.com',
        isMarked: true,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5016',
        subject: 'Rational neural network advances machine-human discovery',
        body: 'Math is the language of the physical world, and some see mathematical patterns everywhere: in weather, in the way soundwaves move, and even in the spots or stripes zebra fish develop in embryos.',
        isRead: true,
        sentAt: new Date(2020, 11, 25).getTime(),
        to: 'user@appsus.com',
        from: 'gil@dolev.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5017',
        subject: 'Honey holds potential for making brain-like computer chips',
        body: 'Honey might be a sweet solution for developing environmentally friendly components for neuromorphic computers, systems designed to mimic the neurons and synapses found in the human brain.',
        isRead: true,
        sentAt: new Date(2020, 11, 25).getTime(),
        to: 'user@appsus.com',
        from: 'shira@shir.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
    {
        id: 'v5018',
        subject: 'Lottery luck in the light of physics: Researchers present theory on the dynamics of many-particle systems',
        body: 'Physicists at the University of Bayreuth are among the international pioneers of power functional theory. This new approach makes it possible for the first time to precisely describe the dynamics of many-particle systems over time. The particles can be atoms, molecules or larger particles invisible to humans. The new theory generalizes the classical density functional theory, which only applies to many-particle systems in thermal equilibrium. In the Reviews of Modern Physics, a research team led by Prof. Dr. Matthias Schmidt presents the basic features of the theory, which was significantly developed and elaborated in Bayreuth.',
        isRead: true,
        sentAt: new Date(2020, 11, 20).getTime(),
        to: 'user@appsus.com',
        from: 'sivan@sagiv.com',
        isMarked: false,
        isTrash: false,
        isDraft: false,
    },
]

function query(filterBy) {
    let mails = _loadMailsFromStorage() || gMailsToDisplay
    if (!mails || !mails.length) {
        mails = gMailsToDisplay
        _saveMailsToStorage(mails)
    }

    if (filterBy) {
        let { searchInp } = filterBy
        mails = mails.filter((mail) => {
            return (
                mail.subject.toLowerCase().includes(searchInp.toLowerCase()) ||
                mail.body.toLowerCase().includes(searchInp.toLowerCase())
            )
        })
    }

    return Promise.resolve(mails)
}

function getMailById(mailId) {
    const mails = _loadMailsFromStorage() || gMailsToDisplay
    const mail = mails.find((mail) => mail.id === mailId)
    return Promise.resolve(mail)
}

function getLoggedInUserMail() {
    return gLoggedInUser.email
}

function updateMail(currMail) {
    query().then(mails => mails.map(mail => {
        if (currMail.id === mail.id) return currMail
        return mail
    })).then(mails => {
        _saveMailsToStorage(mails)
    })
}

function addDraftMail(draft) {
    let mails = _loadMailsFromStorage() || gMailsToDisplay
    mails.unshift(_createDraft(draft))
    _saveMailsToStorage(mails)
}

function autoSaveDraft(newDraft) {
    getMailById(newDraft.id).then((draft) => {
        draft.subject = newDraft.subject || ''
        draft.body = newDraft.body || ''
        draft.sentAt = Date.now() || ''
        draft.to = newDraft.to || ''
        updateMail(draft)
    })
}

function sendMail(newMail) {
    const mails = _loadMailsFromStorage() || gMailsToDisplay
    const idx = mails.findIndex(mail => mail.id === newMail.id)
    mails[idx].subject = newMail.subject || ''
    mails[idx].body = newMail.body || ''
    mails[idx].sentAt = newMail.sentAt || ''
    mails[idx].to = newMail.to || 'UNKNOWN'
    mails[idx].isDraft = false
    _saveMailsToStorage(mails)
}

function toggleMarkMail(mailId) {
    return getMailById(mailId).then((mail) => {
        mail.isMarked = !mail.isMarked
        updateMail(mail)
        return Promise.resolve(mail)
    })
}

function toggleReadMail(mailId, isRead) {
    return getMailById(mailId).then((mail) => {
        if (isRead) {
            mail.isRead = true
        } else {
            mail.isRead = !mail.isRead
        }
        updateMail(mail)
        return Promise.resolve(mail)
    })
}

function deleteMail(mailId) {
    return getMailById(mailId).then((mail) => {
        if (!mail.isTrash) {
            mail.isTrash = true
            updateMail(mail)
            return Promise.resolve(mail)
        } else {
            let mails = _loadMailsFromStorage() || gMailsToDisplay
            mails = mails.filter((mail) => mail.id !== mailId)
            _saveMailsToStorage(mails)
            return Promise.resolve(mails)
        }
    })
}

function getInboxUnreadMails() {
    const mails = _loadMailsFromStorage() || gMailsToDisplay
    let count = 0
    mails.forEach((mail) => {
        if (!mail.isRead && mail.to === getLoggedInUserMail()) count++
    })
    return count
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
        sentAt: Date.now(),
        to: draft.to || '',
        isMarked: false,
        isTrash: false,
        isDraft: true,
    }
}
