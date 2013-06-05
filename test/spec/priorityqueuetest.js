describe("PriorityQueue", function() {

  beforeEach(function() { });

  it("It should sort objects by min value.", function() {
	p = new EasyStar.PriorityQueue("value", EasyStar.PriorityQueue.MIN_HEAP);
	
	var object1 = {};
	var object2 = {};
	var object3 = {};
	var object4 = {};

	object1.value = 5;
	object2.value = 10;
	object3.value = 20;
	object4.value = 15;

	p.insert(object1);
	p.insert(object2);
	p.insert(object3);
	p.insert(object4);

	expect(p.shiftHighestPriorityElement()).toBe(object1);
	expect(p.shiftHighestPriorityElement()).toBe(object2);
  	expect(p.shiftHighestPriorityElement()).toBe(object4);
 	expect(p.shiftHighestPriorityElement()).toBe(object3); 
	expect(p.length).toBe(0);

  });

  it("It should sort objects by max value.", function() {
  	p = new EasyStar.PriorityQueue("value", EasyStar.PriorityQueue.MAX_HEAP);
	
	var object1 = {};
	var object2 = {};
	var object3 = {};
	var object4 = {};

	object1.value = 5;
	object2.value = 10;
	object3.value = 20;
	object4.value = 15;

	p.insert(object1);
	p.insert(object2);
	p.insert(object3);
	p.insert(object4);

	expect(p.shiftHighestPriorityElement()).toBe(object3);
	expect(p.shiftHighestPriorityElement()).toBe(object4);
  	expect(p.shiftHighestPriorityElement()).toBe(object2);
 	expect(p.shiftHighestPriorityElement()).toBe(object1); 
	expect(p.length).toBe(0);

  });

});