function* g() { 
    yield 1;
}

for (let i of g())
    console.log(i);