const boxen = require('boxen')
const chalk = require('chalk')
const link = require('terminal-link')
const r = require('rexrex')

const linkPattern = r.and(
  '\\[',
  r.capture(r.extra(r.matchers.ANY)),
  '\\]',
  '\\(',
  r.capture(r.extra(r.matchers.ANY)),
  '\\)'
)

const newLinePattern = r.group(r.or(r.and('\\r', '\\n'), '\\r', '\\n'))

const TRAGEDIES = [
  'extreme weather',
  'mass extinctions',
  'water shortages',
  'crop failures',
  'wildfires',
  'mass migrations',
  'rising sea levels'
]

const INDENT = '\n         '
const IDEAS = [
  `[Vote for those who prioritize the planet](https://climatechoice.co/change-your-lifestyle).`,
  `[Encourage your government officials to take action](https://climatechoice.co/change-your-lifestyle)\nagainst climate change.`,
  `[Refrain from using a fossil fuel powered vehicle](https://climatechoice.co/change-how-you-travel),\nand switch to electric vehicles, cycling,\npublic transportation, or walking.`,
  `If you are able to, [make the switch to a renewable energy supplier](https://climatechoice.co/choose-renewable-energy),\nor have solar panels installed yourself.`,
  `[Try turning off your heating](https://climatechoice.co/use-less-energy), appliances, hot water,\nor other devices that are not in use.`,
  `[Ditch single use plastics](https://climatechoice.co/change-your-lifestyle), like coffee cups.\nBring your own from home!`
]
  .map(s => {
    const matches = r.regex(linkPattern).exec(s)
    if (matches) {
      return s.replace(matches[0], link(matches[1], matches[2]))
    }
    return s
  })
  .map(s => s.replace(r.regex(newLinePattern, 'g'), INDENT))

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
  const t = shuffle(TRAGEDIES)
  const idea = shuffle(IDEAS).pop()

  const message1 = chalk.bold.keyword('orange')(t.pop())
  const message2 = chalk.bold.keyword('orange')(t.pop())
  const message3 = chalk.bold.keyword('orange')(t.pop())

  const site = link(chalk.green('climatechoice.co'), 'https://climatechoice.co/')

  const message = `
${chalk.cyan('Climate change')} is ${chalk.bold('real')} and ${chalk.bold('accelerating')}.

We must cut global emissions in half by 2030 or face:
${message1}, ${message2}, ${message3}, and more


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
