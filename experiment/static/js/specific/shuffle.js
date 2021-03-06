var shuffle = function(categories) {
    var order = [];
    var done = false;
    var num = [15,5,15,5,15,5,20];
    var names = ['tob', 'tob', 'wug', 'wug', 'dep','dep','bim'];
	var count = [0, 0, 0, 0, 0, 0, 0]; // set counts of each category to 0
	var bins = []; // make bins of possible followers for each category
	
	for(var i = 0; i < categories.length; i++) {	
		var cat = categories[i];
		var egory = [];

		// the control category can be followed by any category
		if(cat == 6) {	
			for(var i = 0; i < 6; i++) {
				pushNTimes(egory, i, num[i]);
			}
		}

		else {
			// add the appropriate number of exemplars (hi vs lo frequency)
			// from the appropriate category
			pushNTimes(egory, (cat + 2) % 6, num[(cat + 2) % 6]);
			pushNTimes(egory, (cat + 3) % 6, num[(cat + 3) % 6]);
			pushNTimes(egory, (cat + 4) % 6, num[(cat + 4) % 6]);
			// the names in names are ordered such that the code above selects
			// appropriate categories i.e. categories that don't share body type

			// any category can be followed by the control category
			pushNTimes(egory, 6, num[6]);
		}
		bins.push(egory);
	}
	
	//select the first element at random
	var prev = categories[Math.floor(Math.random()*categories.length)];
	
	while (!done) {
		// if there are still valid successors...
		if (bins[prev].length !== 0) {
			// ...chooose one at random
			var s = bins[prev][Math.floor(Math.random()*bins[prev].length)];

			// put it in the stimulus order
			order.push(s); //-> ##global##
			count[s] += 1; // increment the count
			prev = s; //remember which item was selected
			
			// remove the item from every bin
			for (var i = 0; i < bins.length; i++) {
				var bin = bins[i];
				try {
					// remove s from bin
					var index = bin.indexOf(s);
					if (index > -1) {
						bin = bin.splice(index, 1);
					}
				}
				catch(err) {	
					// ValueError: # not every item is in every bin
					// print '', # so just catch the error but do nothing
				}
			}
			done = true;
			for (var i = 0; i < count.length; i++) {
				if (num[i] != count[i]) {
					done = false;
					break;
				}
			}
		}
		else
		{
			break;
		}
	}
	return order;
};


var pushNTimes = function(array, value, n) {
	for (var i = 0; i < n; i++) {
		array.push(value);
	}
};

module.exports = shuffle;
