# Sitealarm API

With the **Sitealarm API** you can access all resources of our application through a
user-friendly and structured programming interface (API).

Everything you see in your dashboard can be controlled through the API.
As an added bonus, any changes you make via the API become
visible in your dashboard in real time.


## Getting Started

Let us help you get started.

- Learn more about our API authentication and generate your first API key.
- Use the API to get a list of all your monitors and their checks.

Optionally, we offer a PHP SDK package to make getting started easier.


### API Endpoint

All Sitealarm API endpoints are located at `https://sitealarm.app/api/v2`.
From this point on, a logical structure follows that conforms to the **REST standard**.

Here is a brief summary of the API methods:

- `GET`: All GET requests are used exclusively for retrieving data (e.g. monitor entries, account information) and never change any data.
- `POST`: A POST method adds new monitors or checks to Sitealarm.
- `DELETE`: With the DELETE method, you can remove specific monitors or checks from your account.
- `PUT`: This method is used to update information for existing monitors, checks, or your account.

In general, `GET` requests can be executed as often as you like, while all other methods actually change data in your account and apply those changes.


### Response Data/Format

All responses are returned in JSON format.

```json
{
    "data": {
        "id": 1,
        "name": "My Website",
        "url": "https://example.com",
        "uptime": 99.99,
        "status": "up",
        "created_at": "2020-01-01T00:00:00.000000Z",
        "updated_at": "2020-01-01T00:00:00.000000Z"
    }
}
```

Each endpoint returns data in a specific format.
You can find more details on this in the documentation for the individual endpoints.


### Creating an API Key

To use the API, you need an API key.
You can create an API key by clicking `Settings > API` in your dashboard.

You can give your API key a name to make it easier to identify later.
You also have the option to assign different permissions to your API key.

The following permissions are currently available:
- `read`: This permission allows you to retrieve all data, but not change any data.
- `create`: This permission allows you to create new data.
- `update`: This permission allows you to retrieve and change all data.
- `delete`: This permission allows you to retrieve and delete all data.


### API Authentication

The Sitealarm API uses **API keys** for authentication.
This key must be passed as an `Authorization` header in every API call.

```bash
$ SITEALARM_TOKEN="your API token"
$ curl https://sitealarm.app/api/v2/monitors \
    -H "Authorization: Bearer $SITEALARM_TOKEN" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json'
```


## Monitors

### Retrieve all monitors

#### Request

- HTTP Method: `GET`
- Content Type: `application/json`
- URL: `/monitors`

### Retrieve a specific monitor

#### Request

- HTTP Method: `GET`
- Content Type: `application/json`
- URL: `/monitors/{id}`

### Create a new monitor

#### Request

- HTTP Method: `POST`
- Content Type: `application/json`
- URL: `/monitors`

#### Parameters

| Property    | Type   | Required | Description                |
|-------------|--------|----------|----------------------------|
| ``url``     | String | true     | The URL of the monitor.    |
| ``team_id`` | String | true     | The ID of the team.        |
| ``checks``  | Array  | false    | The checks of the monitor. |

Possible checks are:
- `uptime`: Checks the availability of the website.
- `certificate_health`: Checks the validity of the SSL certificate.
- `mixed_content`: Checks whether the website contains mixed content.
- `broken_links`: Checks whether the website contains broken links.


Here is an example payload:

```json
{
    "url": "https://example.com",
    "team_id": "h:YKMn8Q1WRdqm6GBVlv",
    "checks": [
        "uptime",
        "certificate_health",
        "mixed_content",
        "broken_links"
    ]
}
```
