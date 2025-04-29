#!/bin/sh
# Functions
#================================================
RESET='\033[0m'

get_color() {
  case $1 in
    0) echo '\033[31m' ;;  # Rojo
    1) echo '\033[33m' ;;  # Amarillo
    2) echo '\033[32m' ;;  # Verde
    3) echo '\033[36m' ;;  # Cian
    4) echo '\033[34m' ;;  # Azul
    5) echo '\033[35m' ;;  # Magenta
    *) echo '\033[0m'  ;;  # Reset
  esac
}

print_rainbow() {
  TEXT="$1"
  i=0
  length=6
  j=0
  while [ "$j" -lt "$(printf "%s" "$TEXT" | wc -c)" ]; do
    char=$(printf '%s' "$TEXT" | cut -c $((j + 1)))
    color=$(get_color $((i % length)))
    printf "%b%s%b" "$color" "$char" "$RESET"
    i=$((i + 1))
    j=$((j + 1))
  done
  echo
}

print_blue() {
  BLUE='\033[34m'
  RESET='\033[0m'
  printf "%b%s%b\n" "$BLUE" "$1" "$RESET"
}

# First process - creating changelog
#================================================
echo "\n\n"
print_rainbow "Corriendo script 'CHANGELOG', comenzando con el proceso..."
print_blue "#================================================"
echo "\n\n"
conventional-changelog -p conventionalcommits -i CHANGELOG.md -s -r 0

#================================================
print_rainbow "Agregando cambios al stage"
git add CHANGELOG.md
git commit -m "docs(changelog): :memo: se sube changelog"

#================================================
print_rainbow "Realizando push al repositorio"
git push
