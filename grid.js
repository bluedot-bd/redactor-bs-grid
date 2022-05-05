(function($R)
{
    $R.add('plugin', 'grid', {
        translations: {
            en: {
                "grid": "█ █"
            }
        },
        init: function(app)
        {
            this.app = app;
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.component = app.component;
            this.insertion = app.insertion;
        },
        start: function()
        {
            var dropdownData = {
                grid0: {
                    title: '█ 6 █ 6',api: 'plugin.grid.set',
                    args: ['6','6']
                },
                grid1: {
                    title: '█ 8 █ 4',api: 'plugin.grid.set',
                    args: ['8','4']
                },
                grid2: {
                    title: '█ 9 █ 3',api: 'plugin.grid.set',
                    args: ['9','3']
                },
                grid3: {
                    title: '█ 4 █ 8',api: 'plugin.grid.set',
                    args: ['4','8']
                },
                grid4: {
                    title: '█ 4 █ 4 █ 4',api: 'plugin.grid.set',
                    args: ['4','4','4']
                },
                grid5: {
                    title: '█ 3 █ 3 █ 3 █ 3',api: 'plugin.grid.set',
                    args: ['3','3','3','3']
                },
            };
            var buttonData = {
                title: this.lang.get('grid')
            };
            var $button = this.toolbar.addButton('grid', buttonData);
            var dropdown = $button.setDropdown(dropdownData);
        },
        set: function (t) {
            var html = '<div class="row">' + "\n";
            $.each(t, function(i,v){
                html += '   <div class="col-md-' + v + '" >Grid</div>' + "\n"
            });
            html += '</div>' + "\n";
            this.insertion.insertHtml(html);
        },
    });
})(Redactor);