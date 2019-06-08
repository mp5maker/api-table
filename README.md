## Api Table ##

### Fake Data Creation ###
    https://www.json-generator.com/

    [
        '{{repeat(20)}}',
        {
            id: '{{index() + 1}}',
            name: '{{firstName()}} {{surname()}}',
            designation: '{{company().toUpperCase()}}',
            joining_date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
            department: '{{company().toUpperCase()}}'
        }
    ]


### How to Start the Project ###

    npm install
    npm run build && npm run dev
    npm run server
    npm run test:watch