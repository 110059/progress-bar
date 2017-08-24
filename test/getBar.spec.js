describe("getBar", function() {

  beforeEach(module("sliderApp"));

  describe("Get data from http://pb-api.herokuapp.com/bars", function() {

    var service, $httpBackend;

    beforeEach(inject(function($injector) {
      service = $injector.get('BarsService');
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.when('GET', "http://pb-api.herokuapp.com/bars").respond({
        "buttons": [48, 23, -48, -35],
        "bars": [18, 82, 53],
        "limit": 190
      });
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('response should return bars', function() {
      service.async().then(function(response) {
        expect(response.bars.length >= 0).toBeTruthy();
      });
      $httpBackend.flush();
    });
  });
});