function containsRepeats(arr) {
  for (let i = 0; i < arr.length; ++i) {
    let elem = arr[i];
    for (let j = 0; j < arr.length; ++j) {
      if (j === i) {continue;}
      if (arr[j] === elem) {
        return true;
      }
    }
  }
  return false;
}

function contains(arr, elem) {
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] === elem) {return true;}
  }
  return false;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateInput(n) {
  let set1 = [];
  for (let i = 0; i < n; ++i) {
    let arr = [];
    for (let j = 0; j < n; ++j) {
      let k = randomInt(0, n);
      while (contains(arr, k)) {
        k = randomInt(0, n);
      }
      arr.push(k);
    }
    set1.push(arr);
  }
  return set1;
}

function oracle(matchmaker) {
  let numTests = 12; // Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
    let n = 24; // Change this to some reasonable size
    let companies = generateInput(n);
    let candidates = generateInput(n);
    let hires = matchmaker(companies, candidates);
    test('Hires length is correct', function() {
      assert(companies.length === hires.length);
    });
    test("valid randomly generated set", function() {
      for (let i = 0; i < n; ++i) {
        assert(!containsRepeats(companies[i]));
        assert(!containsRepeats(candidates[i]));
      }
    });
    test("stability", function() {
      for (let i = 0; i < hires.length; ++i) {
        let company = hires[i].company;
        let candidate = hires[i].candidate;
        let companyPreferences = companies[company];
        let candidatePreferences = candidates[candidate];
        for (let j = 0; j < companyPreferences.length; ++j) {
          if (companyPreferences[j] === candidate) {
            break;
          }
          for (let k = 0; k < hires.length; ++k) {
            if (hires[k].candidate === companyPreferences[j]) {
              let ocl = hires[k].candidate;
              let ocmatch = 0;
              let octp = 0;
              for (let l = 0; l < candidates[ocl].length; ++l) {
                if (candidates[ocl][l] === company) {octp = l;}
                if (candidates[ocl][l] === hires[k].company) {ocmatch = l;}
              }
              assert(octp>ocmatch);
            }
          }
        }
      }
    });
  }
}
oracle(wheat1);
//oracle(chaff1);