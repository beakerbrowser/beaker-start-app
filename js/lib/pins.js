

export async function load () {
  var fs = await navigator.filesystem.getRoot()
  try {
    var str = await fs.readFile('/.data/beakerbrowser.com/pins.json')
    var obj = JSON.parse(str)
    return obj.pins
  } catch (e) {
    console.log('Failed to load pins, falling back to defaults', e)
    return defaults()
  }
}

export async function save (pins) {
  var fs = await navigator.filesystem.getRoot()
  await fs.mkdir('/.data').catch(err => null)
  await fs.mkdir('/.data/beakerbrowser.com').catch(err => null)
  await fs.writeFile('/.data/beakerbrowser.com/pins.json', JSON.stringify({
    type: 'beakerbrowser.com/pins',
    pins
  }))
}

// internal methods
// =

function defaults () {
  return [
    {title: 'Beaker.Social', href: 'dat://beaker.social'},
    {title: 'Documentation', href: 'dat://beakerbrowser.com/docs'},
    {title: 'Report an issue', href: 'https://github.com/beakerbrowser/beaker/issues'},
    {title: 'Dat Foundation', href: 'dat://dat.foundation'},
    {title: 'Support Beaker', href: 'https://opencollective.com/beaker'}
  ]
}