'use strict'
const yaml = require('js-yaml')
const fs = require('fs')

const mdHeader = `
# Ports List

> Auto Generate!! **Don't Modify This File**

List By Port Number Order
`

const mdFooter = `
> Updated: ${new Date().toString()}
`

const singleTemplate = d => `
## ${d.port}

${d.description || '*No Description*'}

### Usages

${
    d.usages ? d.usages.map(usage => `- ${
        usage.link ? `[${usage.name}](${usage.link})` : usage.name
    }`).join('\n') : ''
}
`

const data = yaml.load(fs.readFileSync('./ports.yaml'))
const ports = data.ports.sort((p1, p2) => p1.port - p2.port)

const md = `
${mdHeader}
${
    ports.map(singleTemplate).join('\n')
}
${mdFooter}
`.trim()
fs.writeFileSync('./ports.md', md)
console.log('Done!')
