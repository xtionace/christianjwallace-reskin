import * as migration_20261007_020907_init from './20261007_020907_init'

export const migrations = [
  {
    up: migration_20261007_020907_init.up,
    down: migration_20261007_020907_init.down,
    name: '20261007_020907_init',
  },
]
