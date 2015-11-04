function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['Jimmy', 'Court'];
}

Person.prototype = {
    constuctor: Person,
    sayName: function () {
        alert(this.name);
    }
};

var person1 = new Person('Adult', 25, 'AV man');
var person2 = new Person('cang teacher', 30, 'AV women');

person1.friends.push('Van');
alert(person1.friends);
alert(person2.friends);

var SubType = function () {
    Person.call(this);  //防止原型链继承 出现 引用参数被其他实例修改而影响其他实例
}
SubType.prototype = new Person();

var bubType = new SubType();
bubType.friends.push('Kim');
alert(bubType.friends);

var bubType2 = new SubType();
alert(bubType2.friends);