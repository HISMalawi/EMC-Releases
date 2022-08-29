# About EMC Module
This module is based on the current E-Mastercard v4.5.1. All the key features from that system have been maintained with minor enhancements and bug fixes.

# Features
- Reports (MOH, PEPFAR, CLINIC)
- Data Management tools
- Patient encounters
- Mastercard
- User Management
- System settings

# Upgrades
### 1. UI/UX Improvements
- Most of the screens has been re-designed to imroved user experience and conform with the philosophy of new architecture. these includes:
  1. Multi level collapsible side menu
  2. Report template
  3. Many application layout
  3. Outcome status modal
  4. Viral load result form
  5. ART number update form
  6. and many more

### 2. Performance Improvements
- Custom components were priotizing over libraries to reduce application size and other side effects that comes with libraries. these include:
  1. custom datatable that has enhenced features similar to Bootstrap/JQuery datatable library
  2. custom select input that has enhenced features similar to vue-select which does not support vue 3 at the moment.

- Custom function validators were used instead validation libraries
- Reduced the use blocking activities by loading parts of the screens/page data asynchronously
- Use lady load routing to reduce compiled js chunk sizes

### 3. Validation Improvements and Bug Fixes
- Additional validations has been added based on the issues that were reported on the current E-Mastercard

### 4. New Concepts
- New concepts has been added for TB status at Initiation in order to conform with the current version of Mastercard v8. These change will require updating API Metadata for the module/App to function as intended.

# Future Todos
- Use desktop form builder to reduce maintenance cost and speed up future developments
