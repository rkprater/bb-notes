define(function (require) {
  var models = require('models');

  describe('Book Model', function () {

    beforeEach(function () {
      this.myModel = new models.BookModel();
    });

    it('should be an instance of Backbone.Model', function () {
      expect(this.myModel).to.be.an.instanceof(Backbone.Model);
    });

    it('should have a default photo', function () {
      expect(this.myModel.get('photo')).to.be.equal('http://33.media.tumblr.com/62bc005e281acfb64397f6a94be586f5/tumblr_neizc7qKmK1rnsoa0o1_250.jpg');
    });

    it('should have a urlRoot', function () {
      expect(this.myModel.urlRoot).to.be.equal('http://tiy-fee-rest.herokuapp.com/collections/books');
    });

    it('title should be undefined if create empty model', function () {
      expect(this.myModel.get('title')).to.be.undefined();
    });

    it('should properly set an attribute on the model', function () {
      expect(this.myModel.get('title')).to.be.undefined();

      this.myModel.set({title: 'Cool Book by Brooke'});
      expect(this.myModel.get('title')).to.be.equal('Cool Book by Brooke');
      expect(this.myModel.attributes).to.have.property('title');
    });

    it('should validate if title is empty and have an error property', function () {
      expect(this.myModel.validationError).to.be.a('null');
      this.myModel.set({title: ''}, {validate: true});
      expect(this.myModel.validationError).to.be.equal('Title is required');

    });


  });

  describe('Book Collection', function () {
    beforeEach(function () {
      this.modelA = new models.BookModel();
      this.modelT = new models.BookModel();
      this.myCollection = new models.BooksCollection();
      this.myCollection.add([this.modelA,this.modelT]);
    });

    it('should be an instance of Backbone.Collection', function () {
      expect(this.myCollection).to.be.an.instanceof(Backbone.Collection);
    });

    it('should have correct amount of models', function () {
      expect(this.myCollection.length).to.be.equal(2);
    });

    it('should sort collection based on title', function () {
      this.modelA.set({title: 'a title'});
      this.modelT.set({title: 'z title'});
      expect(this.myCollection.at(0).get('title')).to.be.equal('a title');
    });

    it('should properly remove models from collection', function () {
      expect(this.myCollection.length).to.be.equal(2);
      this.myCollection.remove(this.modelA);
      expect(this.myCollection.length).to.be.equal(1);
    });



  });


});
