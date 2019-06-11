## Api Table ##

### Fake data creation ###
[Json Generator](https://www.json-generator.com/)

    [
        '{{repeat(5050)}}',
        {
            id: '{{index() + 1}}',
            name: '{{firstName()}} {{surname()}}',
            designation: '{{company().toUpperCase()}}',
            joining_date: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
            department: '{{company().toUpperCase()}}'
        }
    ]

***
### Starting the project ###

    npm install
    npm run build && npm run dev
    npm run server
    npm run test:watch

***
### Additional Notes ###

**For this Project**
>   Scrolling Implementation (Like Facebook) has been excluded for all the data showing due to time constraints

> Testing for many components has been excluded

**Please feel free to check my [Github](https://github.com/mp5maker/) account**

>One of the project [Estate](https:sphotonkhan.com/estate)

***

[Live Demo](https://heroku-api-table.herokuapp.com/)

[Live Fake Rest Api](https://heroku-fake-rest-api.herokuapp.com/)

***

### Some caveats regarding Live Demo/Live Fake Rest Api ###

Live demo has been deployed in **heroku** using the **US Server**
It is very **slow** and **sometimes** some of the **filters do not work**