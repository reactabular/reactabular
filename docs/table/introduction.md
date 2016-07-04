A Reactabular table relies on three concepts - data, column definition (JavaScript structure) and React definition:

* **Data** is expected to be an array of objects.
* **The column definition** maps the data into something that can be shown through the user interface. It defines how to extract the data from it and what sort of special formatting or functionality needs to be attached to it.
* **React definition** uses both of these and maps the data through the column definition to the user interface. You have additional control over here as you can attach for example classes or table row specific hooks if you have to.

Most of the power of Reactabular is within the column definition. You can embed React code within it to customize the table further. And if that's not enough, you have decent control over the table layout when rendering.
