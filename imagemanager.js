!(function (t) {
    t.add("plugin", "imagemanager", {
        translations: { en: { choose: "Archive" } },
        init: function (t) {
            (this.app = t), (this.lang = t.lang), (this.opts = t.opts), (this.$pagi = null), (this.$pagiOpt = null);
        },
        onmodal: {
            image: {
                open: function (t, a) {
                    this.opts.imageManagerJson && this._load(t);
                },
            },
        },
        _load: function (a) {
            var i = a.getBody();
            (this.$box = t.dom("<div>")),
                this.$box.attr("data-title", this.lang.get("choose")),
                this.$box.addClass("redactor-modal-tab"),
                this.$box.html("<input class='form-control mb-3' id='img_search' placeholder='Search...' /><div id='imgList'></div><div id='pagiDiv'><div id=\"pagi\" class=\"mt-3\"></div></div>"),
                this.$box.hide(),
                this.$box.css({
                    overflow: "auto",
                    "min-height": "300px",
                    "line-height": 1,
                }),
                i.append(this.$box),
                t.ajax.get({
                    url: this.opts.imageManagerJson,
                    success: this._parse.bind(this),
                });
                this.$pagiOpt = {
                    paginationClass: 'pagination justify-content-center',
                    startPage: 1,
                    totalPages: 1,
                    visiblePages:1,
                    onPageClick: function(e,page){
                        if(this.$pagiOpt.startPage != page ){
                            this._loadData(page);
                        }
                    }.bind(this)
                };
                this.$pagi = $('#pagi').twbsPagination(this.$pagiOpt);

                var timeout = null;
                $("#img_search").on('keyup', function(){
                    clearTimeout(timeout);
                    timeout = setTimeout(function(){
                        this._loadData(1, $("#img_search").val());
                    }.bind(this), 400);
                }.bind(this));
        },
        _loadData: function(page, search){
            var extra = (search) ? '&search='+search : '';
            extra += (page) ? '&page=' + page : '';
            t.ajax.get({
                url: this.opts.imageManagerJson + '?' + extra,
                success: this._parse.bind(this),
            });
        },
        _parse: function (a) {
            var data = a;
            this.$box.find('#imgList').html('');
            // this.$box.html("");
            if(a.data){
                for (var i in a.data) {
                    var o = a.data[i];
                    if ("object" == typeof o) {
                        var url = this.opts.imageManagerPrefix + o.path;
                        var _data = {thumb: url.replace("redactor/","redactor/sm_"), url: url.replace("redactor/","redactor/lg_"), title: o.name, id: o.id};
                        var s = t.dom("<img>"),
                            e = url.replace("redactor/","redactor/sm_");
                        s.attr("src", e),
                            s.attr("data-params", encodeURI(JSON.stringify(_data))),
                            s.css({
                                width: "96px",
                                height: "72px",
                                margin: "0 4px 2px 0",
                                cursor: "pointer",
                            }),
                            s.on("click", this._insert.bind(this)),
                            // this.$box.append(s);
                            this.$box.find('#imgList').append(s);
                            
                    }
                }

                this.$pagi.twbsPagination('destroy');
                this.$pagi.remove();
                $('#pagiDiv').html('<div id="pagi" class="mt-3"></div>');
                this.$pagi = $('#pagi');
                this.$pagiOpt.startPage = data.current_page;
                this.$pagiOpt.totalPages = data.last_page;
                this.$pagiOpt.visiblePages = (data.last_page>=5) ? 5 : data.last_page;
                this.$pagi.twbsPagination(this.$pagiOpt);

            }else{
                for (var i in a) {
                    var o = a[i];
                    if ("object" == typeof o) {
                        var s = t.dom("<img>"),
                            e = o.thumb ? o.thumb : o.url;
                        s.attr("src", e),
                            s.attr("data-params", encodeURI(JSON.stringify(o))),
                            s.css({
                                width: "96px",
                                height: "72px",
                                margin: "0 4px 2px 0",
                                cursor: "pointer",
                            }),
                            s.on("click", this._insert.bind(this)),
                            this.$box.append(s);
                    }
                }
            }
        },
        _insert: function (a) {
            a.preventDefault();
            var i = t.dom(a.target),
                o = JSON.parse(decodeURI(i.attr("data-params")));
            this.app.api("module.image.insert", { image: o });
        },
    });
})(Redactor);
//# sourceMappingURL=imagemanager.js.map