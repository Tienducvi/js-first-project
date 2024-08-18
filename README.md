1. Script:
    "prettier": "prettier --config .prettierrc \"src/**/*.ts\" --write",
    "build": "npx tsc",
    "start": "nodemon src/index.ts",
    "jasmine": "jasmine",
    "test": "npm run build && npm run jasmine",
    "lint": "eslint \"/**/*.ts\" --ignore-pattern node_modules/"

2. Endpoint:
    Normal link: http://localhost:8082/filteredimage?filename=fjord&width=100&height=100
    ** filename should be the name of any image file in image asset folder from Udacity
    Error link: http://localhost:8082/filteredimage?filename=fjord
    http://localhost:8082/filteredimage?filename=fjord&width=a&height=b