import moment from 'moment'

export function handler(event, context, callback) {
  const target = moment(process.env.TARGET_TIME, 'h:m')
  const now = moment()

  let response = ''
  if (now.isBefore(target)) {
    response = `Sorry, it's not ${process.env.TARGET_TIME} yet`
  } else if (now.isBetween(target, target.add(10, 'm'))) {
    response = `Hell yeah it's ${process.env.TARGET_TIME}`
  } else {
    response = `Sorry, you missed ${process.env.TARGET_TIME}`
  }

  callback(null, { statusCode: 200, headers: {}, body: response })
}
