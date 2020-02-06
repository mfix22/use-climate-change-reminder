const boxen = require('boxen')
const chalk = require('chalk')
const link = require('terminal-link')
const r = require('rexrex')

const linkPattern = r.and(
  '\\[',
  r.capture(r.extra(r.matchers.ANY, true)),
  '\\]',
  '\\(',
  r.capture(r.extra(r.matchers.ANY, true)),
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
  `If you are able to, [make the switch to a renewable energy supplier](https://climatechoice.co/choose-renewable-energy),\nor have solar panels installed yourself.`,
  `[Refrain from using a fossil fuel powered vehicle](https://climatechoice.co/change-how-you-travel),\nand switch to electric vehicles, cycling,\npublic transportation, or walking.`,
  `Offset your carbon footprint with services\nlike [Project Wren](https://projectwren.com/) and [Offset Earth](https://offset.earth/).`,
  `Join a [climate action group](https://erikareinhardt.com/personal-climate-action#climate-action-groups) in your area.`
]
  .map(s => {
    const matches = s.match(r.regex(linkPattern, 'g'))

    if (matches) {
      return matches.reduce((accum, pattern) => {
        const match = pattern.match(r.regex(linkPattern))

        return accum.replace(match[0], link(match[1], match[2]))
      }, s)
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

// const site = link(chalk.green('climatechoice.co'), 'https://climatechoice.co/')
// Visit ${site} and find out what you can do to help.

function formatMessage() {
  const t = shuffle(TRAGEDIES)
  const idea = shuffle(IDEAS).pop()

  const message1 = chalk.bold.keyword('orange')(t.pop())
  const message2 = chalk.bold.keyword('orange')(t.pop())
  const message3 = chalk.bold.keyword('orange')(t.pop())

  const message = `
${chalk.cyan('Climate change')} is ${chalk.bold('real')} and ${chalk.bold('accelerating')}.

We must cut global emissions in half by 2030 or face:
${message1}, ${message2}, ${message3}, and more


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
