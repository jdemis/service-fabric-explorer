# View Controllers Breakdowns
View controllers hook over some of Angular's life cycle hooks to increase resuability, mainly the ngOnInit and ngOnDestroy ones specifically. This also exposes SFX life cycle hooks to provide entry points for easier code splitting into different pages. Generally each entity type will provide an inheritted controller that all pages share and will implemenet getParams and Common, then a page specific controller will provide their own refresh implementation for that specific page.

This provides a more clear way to handle individual views than the previous version of SFX but could continue to be expanded to split the page specific controllers to remove their depedency on this base controller and pass in information through Inputs.

## setup()
This effectively reprovides ngOnInit but waits until the route params have been provided.

## getParams()
Get and set this entitie's properties out of params.

## refresh()
Request page specific data.

## common()
Request common data for this entity between all of these pages.