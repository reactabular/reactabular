# Customizing Footer

Adding a custom footer is simple. Just write the definition inside `Table` itself. In this particular case it's not very useful but you could easily generate things like sums and such here.

```jsx
<Table columns={columns} header={header} data={paginated.data}>
    <tfoot>
        <tr>
            <td>
                You could show sums etc. here in the customizable footer.
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tfoot>
</Table>
```
