# COMO HACER COMMITS

## Structure
```bash
build: :tada: primer commit

primer subida al repo del proyecto
```

## Type of change

|tipo    |Descripción                                                                                |
|--------|-------------------------------------------------------------------------------------------|
|feat    |Nueva característica                                                                       |
|fix     |Una corrección de errores                                                                  |
|docs    |Sólo cambia la documentación                                                               |
|style   |Cambios que no afectan el significado del código (espacios en blanco, formato, etc)        |
|refactor|Un cambio de código que no corrige un error ni agrega una función                          |
|perf    |Un cambio de código que mejora el rendimiento                                              |
|test    |Agrega pruebas faltantes o corrige pruebas existentes                                      |
|build   |Cambios que afectan el sistema de compilación o las dependencias externas ( gulp, npm, etc)|
|ci      |Cambios en scripts y archivos de configuración CI (Travis, browserStack, etc)              |
|chore   |Otros cambios que no modifican src ni archivos de prueba                                   |
|revert  |Revierte una confirmación anterior                                                         |

## Gitmojis

|emoji                     |Descripción                                           |emoji                          |Descripción                              |
|--------------------------|------------------------------------------------------|-------------------------------|-----------------------------------------|
|🎨 \:art:                 |Improve structure / format of the code.               |💚 \:green_heart:              |Fix CI Build.                            |
|⚡️ \:zap:                 |Improve performance.                                  |⬇️ \:arrow_down:               |Downgrade dependencies.                  |
|🔥 \:fire:                |Remove code or files.                                 |⬆️ \:arrow_up:                 |Upgrade dependencies.                    |
|🐛 \:bug:                 |Fix a bug.                                            |📌 \:pushpin:                  |Pin dependencies to specific versions.   |
|🚑️ \:ambulance:           |Critical hotfix.                                      |👷 \:construction_worker:      |Add or update CI build system.           |
|✨ \:sparkles:            |Introduce new features.                               |📈 \:chart_with_upwards_trend: |Add or update analytics or track code.   |
|📝 \:memo:                |Add or update documentation.                          |♻️ \:recycle:                  |Refactor code.                           |
|🚀 \:rocket:              |Deploy stuff.                                         |➕ \:heavy_plus_sign:          |Add a dependency.                        |
|💄 \:lipstick:            |Add or update the UI and style files.                 |➖ \:heavy_minus_sign:         |Remove a dependency.                     |
|🎉 \:tada:                |Begin a project.                                      |🔧 \:wrench:                   |Add or update configuration files.       |
|✅ \:white_check_mark:    |Add, update, or pass tests.                           |🔨 \:hammer:                   |Add or update development scripts.       |
|🔒️ \:lock:                |Fix security or privacy issues.                       |🌐 \:globe_with_meridians:     |Internationalization and localization.   |
|🔐 \:closed_lock_with_key:|Add or update secrets.                                |✏️ \:pencil2:                  |Fix typos.                               |
|🔖 \:bookmark:            |Release / Version tags.                               |💩 \:poop:                     |Write bad code that needs to be improved.|
|🚨 \:rotating_light:      |Fix compiler / linter warnings.                       |⏪️ \:rewind:                   |Revert changes.                          |
|🚧 \:construction:        |Work in progress.                                     |🔀 \:twisted_rightwards_arrows:|Merge branches.                          |
|📦️ \:package:             |Add or update compiled files or packages.             |👽️ \:alien:                    |Update code due to external API changes. |
|🚚 \:truck:               |Move or rename resources (e.g.: files, paths, routes).|📄 \:page_facing_up:           |Add or update license.                   |
|💥 \:boom:                |Introduce breaking changes.                           |🍱 \:bento:                    |Add or update assets.                    |
|♿️ \:wheelchair:          |Improve accessibility.                                |💡 \:bulb:                     |Add or update comments in source code.   |
|🍻 \:beers:               |Write code drunkenly.                                 |💬 \:speech_balloon:           |Add or update text and literals.         |
|🗃️ \:card_file_box:       |Perform database related changes.                     |🔊 \:loud_sound:               |Add or update logs.                      |
|🔇 \:mute:                |Remove logs.                                          |👥 \:busts_in_silhouette:      |Add or update contributor(s).            |
|🚸 \:children_crossing:   |Improve user experience / usability.                  |🏗️ \:building_construction:    |Make architectural changes.              |
|📱 \:iphone:              |Work on responsive design.                            |🤡 \:clown_face:               |Mock things.                             |
|🥚 \:egg:                 |Add or update an easter egg.                          |🙈 \:see_no_evil:              |Add or update a .gitignore file.         |
|📸 \:camera_flash:        |Add or update snapshots.                              |⚗️ \:alembic:                  |Perform experiments.                     |
|🔍️ \:mag:                 |Improve SEO.                                          |🏷️ \:label:                    |Add or update types.                     |
|🌱 \:seedling:            |Add or update seed files.                             |🚩 \:triangular_flag_on_post:  |Add, update, or remove feature flags.    |
|🥅 \:goal_net:            |Catch errors.                                         |💫 \:dizzy:                    |Add or update animations and transitions.|
|🗑️ \:wastebasket:         |Deprecate code that needs to be cleaned up.           |🛂 \:passport_control:         |Work on code related to authorization, roles and permissions.|
|🩹 \:adhesive_bandage:    |Simple fix for a non-critical issue.                  |🧐 \:monocle_face:             |Data exploration/inspection.                                 |
|⚰️ \:coffin:              |Remove dead code.                                     |🧪 \:test_tube:                |Add a failing test.                                          |
|👔 \:necktie:             |Add or update business logic.                         |🩺 \:stethoscope:              |Add or update healthcheck.                                   |
|🧱 \:bricks:              |Infrastructure related changes.                       |🧑‍💻 \:technologist:             |Improve developer experience.                                |
|💸 \:money_with_wings:    |Add sponsorships or money related infrastructure.     |🧵 \:thread:                   |Add or update code related to multithreading or concurrency. |
|🦺 \:safety_vest:         |Add or update code related to validation.             |✈️ \:airplane:                 |Improve offline support.                                     |