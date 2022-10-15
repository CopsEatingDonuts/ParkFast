module.exports = {
  "output": {
    "filename": "[name].pack.js"
  },
  "entry": {
    "SearchDestination": "./SearchDestination"
  },
  "module": {
    "rules": [
      {
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "babel-preset-env",
              "babel-preset-react"
            ]
          }
        },
        "exclude": /node_modules/,
        "test": /\.js$/
      }
    ]
  }
};