/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have defined URLs that are not empty',function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have defined names that are not empty', function() {
             allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        var bodyTag;

        beforeEach(function() {
            bodyTag = document.getElementsByTagName("body")[0];
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
            expect(bodyTag.classList).toContain('menu-hidden');
        });
    

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          // handling the event 'click' on the menu icon is based on the 
          // stackoverflow post found on 
          // https://stackoverflow.com/questions/10823790/testing-a-click-event-with-jasmine-that-appends-a-style-sheet-to-the-head
          it('should change visibility when the menu icon is clicked', function() {

            $('.menu-icon-link').trigger('click');
            expect(bodyTag.classList).not.toContain('menu-hidden');

            $('.menu-icon-link').trigger('click');
            expect(bodyTag.classList).toContain('menu-hidden');
          });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('should at least have 1 element', function(done) {
            var feedContainer = document.getElementsByClassName('feed')[0];
            var feeds = feedContainer.getElementsByClassName('entry-link');
            expect(feeds.length).not.toBe(0);
            done();
         });


    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var initialContent,
            newContent,
            feedContainer = $('.feed');

        beforeEach(function(done) {
            loadFeed(0, function() {
                initialContent = feedContainer.html();
                loadFeed(2, function() {
                    newContent = feedContainer.html();
                    done();
                });
            });
        });
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         it('should load when a new feed subject is clicked', function(done) {
            expect(initialContent).not.toEqual(newContent);
            done();
         });
    });

}());
