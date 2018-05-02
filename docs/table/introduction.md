A Reactabular table relies on four concepts - rows, column definition (JavaScript structure), React definition, and renderers:

* **Rows** are expected to be an array of objects.
* **The column definition** maps the **rows** into something that can be shown through the user interface.
* **React definition** uses both of these and maps the rows through the column definition to the user interface.
* **Renderers** allow you to customize the table elements. You can attach custom event handlers and HTML attributes to them. Renderers can be expanded and overridden at the **column definition**.
