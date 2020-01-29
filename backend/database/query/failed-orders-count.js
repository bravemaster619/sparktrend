module.exports = `[
  {
    "$addFields": {
      "deadline": {
        "$add": [
          "$start_from",
          {
            "$multiply": [
              "$time",
              3600000
            ]
          },
          {{time_margin}}
        ]
      }
    }
  },
  {
    "$match": {
      {{user_query}}
      "$or": [
        {
          "history.accepted_at": {
            "$exists": true
          },
          "history.completed_at": null,
          "$expr": {
            "$lte": [
              "$deadline",
              {{current_time}}
            ]
          }
        },
        {
          "history.refunded_at": {
            "$exists": true
          }
        }
      ]
    }
  },
  {
    "$count": "count"
  }
]`
