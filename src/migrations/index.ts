import * as migration_20261007_020907_init from './20261007_020907_init'
import * as migration_20261007_091216_homepage_copy from './20261007_091216_homepage_copy'

export const migrations = [
  {
    up: migration_20261007_020907_init.up,
    down: migration_20261007_020907_init.down,
    name: '20261007_020907_init',
  },
  {
    up: migration_20261007_091216_homepage_copy.up,
    down: migration_20261007_091216_homepage_copy.down,
    name: '20261007_091216_homepage_copy',
  },
]
