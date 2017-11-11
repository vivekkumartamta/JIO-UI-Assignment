$(function(){

    // Create a model for the articles
    var Article = Backbone.Model.extend({

        // Will contain three attributes.
        // These are their default values

        defaults:{
            id: 0000,
            title: 'Article',
            date: 1510387921,
            contect : "Demo data for Article"
        }
    });

    // Create a collection of articles
    var ArticleList = Backbone.Collection.extend({

        // Will hold objects of the Artic model
        model: Article
    });

    // Prefill the collection with a number of articles.
    var articles = new ArticleList([
        new Article({ 
                    id: 0001,
                    title: 'Article 1',
                    date: 1510387921,
                    contect : "Demo data for Article 1",
                    checked: false}),
        new Article({ 
                    id: 0002,
                    title: 'Article 2',
                    date: 1510387930,
                    contect : "Demo data for Article 2",
                    checked: false})
        // Add more here
    ]);

    // This view turns a Article model into HTML. Will create LI elements.
    var ArticleView = Backbone.View.extend({
        tagName: 'li',

        events:{
            'click': 'routeArticles'
        },

        initialize: function(){

            // Set up event listeners. The change backbone event
            // is raised when a property changes (like the checked field)

            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){

            // Create the HTML

            this.$el.html('<p type="text" value="1" name="' + this.model.get('title') + '" /p> ' + this.model.get('title'));
            

            // Returning the object is a good practice
            // that makes chaining possible
            return this;
        },

        routeArticles: function(){
            //routing
        }
    });

    // The main view of the application
    var App = Backbone.View.extend({

        // Base the view on an existing element
        el: $('#main'),

        initialize: function(){

            // Cache these selectors
            this.list = $('#services');

            // Listen for the change event on the collection.
            // This is equivalent to listening on every one of the 
            // Article objects in the collection.
            this.listenTo(articles, 'change', this.render);

            // Create views for every one of the articles in the
            // collection and add them to the page

            articles.each(function(article){

                var view = new ArticleView({ model: article });
                this.list.append(view.render().el);

            }, this);   // "this" is the context in the callback
        },

        render: function(){

            return this;
        }
    });

    new App();

});