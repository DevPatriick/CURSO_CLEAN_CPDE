const sendMailQueue = require('../../infra/queue/bull/index')
const sendMail = require('./jobs/sendMail')

sendMailQueue.process(sendMail.handle)