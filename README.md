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
    npm run build
    npm run dev
    npm run server

>***npm run dev**  [Run this is one terminal]*

>***npm run server** [Run this in another terminal]*

***

### Test ###

    npm run test
    npm run test:watch


### Additional Notes ###

**For this Project**
>  Scrolling Implementation (Like Facebook) is not implemented

> Date field orders by string not by actual date

> Testing for many components has been excluded

**Please feel free to check my [Github](https://github.com/mp5maker/) account**

>One of the project [Estate](https:sphotonkhan.com/estate)

***

[Live Demo](https://heroku-api-table.herokuapp.com/)

[Live Fake Rest Api](https://heroku-fake-rest-api.herokuapp.com/posts)

***

### Some caveats regarding Live Demo / Live Fake Rest Api ###

Live demo has been deployed in **heroku** using the **US Server**

It is very **slow** and **sometimes** some of the **filters do not work**

**Reason** Fake Rest Api in heroku is giving trouble with _order=asc and _order=desc.
It goes in "ascending order" by default