# Changelog

## 0.0.0-beta.25

### Breaking Changes

- Removed `allowFewerDatesThanRange`, `skipDisabledDatesInRange`. Adds unrequired complexity.

## 0.0.0-beta.24

### Breaking Changes

- Removed `disablePast`, `disableFuture` and `disableToday` props. Use `isDisabled` prop instead.
- Removed `minAllowedDate` and `maxAllowedDate` props. Use `isDisabled` prop instead.

### New Features

- Added `monthsLabel` prop to change the label of the months.
- Added `weekDaysLabel` prop to change the label of the week days.
