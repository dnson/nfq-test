const flex = `
  display: flex;
`

export default {
  flex,
  row: `
    ${flex}
    flex-direction: row;
  `,
  col: `
    ${flex}
    flex-direction: column;
  `,
  start: `
    ${flex}
    justify-content: flex-start;
  `,
  end: `
    ${flex}
    justify-content: flex-end;
  `,
  center: `
    ${flex}
    align-items: center;
    justify-content: center;
  `,
  verticalCenter: `
    ${flex}
    align-items: center;
  `,
  noWrap: `
    overflow: 'hidden',
    white-space: 'nowrap',
    text-overflow: 'ellipsis'
  `,
  breakWord: `
    overflow-wrap: break-word;
  `
}
