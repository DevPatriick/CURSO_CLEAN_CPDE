const sendMailQueue = require('../../infra/queue/bull/index')
require('dotenv/config')
const sendMail = require('./jobs/sendMail')

sendMailQueue.process(sendMail.handle)