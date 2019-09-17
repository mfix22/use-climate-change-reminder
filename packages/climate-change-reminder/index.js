const boxen = require('boxen')
const chalk = require('chalk')
const link = require('terminal-link')

const tragedies = [
  'extreme weather',
  'mass extinctions',
  'water shortages',
  'crop failures',
  'wildfires',
  'mass migrations',
  'rising sea levels'
]

const INDENT = '\n         '
const ideas = [
  `${link(
    'Consider consuming less food',
    'https://climatechoice.co/change-how-you-eat'
  )} with a high${INDENT}carbon footprint, like meat or dairy.`,
  `${link(
    'Refrain from using a fossil fuel powered vehicle',
    'https://climatechoice.co/change-how-you-travel'
  )},${INDENT}and switch to cycling, public transportation,${INDENT}or walking.`,
  `If you are able to, ${link(
    'make the switch to a renewable energy supplier',
    'https://climatechoice.co/choose-renewable-energy'
  )},${INDENT}or have solar panels installed yourself.`,
  `${link(
    'Try turning off your heating',
    'https://climatechoice.co/use-less-energy'
  )}, appliances, hot water,${INDENT}or other devices that are not in use.`
]

function shuffle(arr) {
  let array = arr.slice()
  let m = array.length

  while (m > 0) {
    // Pick a remaining element…
    const i = Math.floor(Math.random() * m--)

    const t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

function formatMessage() {
  const t = shuffle(tragedies)
  const idea = shuffle(ideas).pop()

  const x1 = chalk.bold.keyword('orange')(t.pop())
  const x2 = chalk.bold.keyword('orange')(t.pop())

  const site = link(chalk.green('climatechoice.co'), 'https://climatechoice.co/')

  const message = `
${chalk.cyan('Climate change')} is ${chalk.bold('real')} and ${chalk.bold('accelerating')}.

We must cut global emissions in half by 2030 
or face: ${x1}, ${x2}, and more


Visit ${site} and find out what you can do to help.


${chalk.yellowBright('💡 IDEA')}: ${idea}
`

  return boxen(message, {
    padding: 1,
    borderColor: 'green',
    margin: 1,
    borderStyle: 'round'
  })
}

module.exports = formatMessage
