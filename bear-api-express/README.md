# Schema Builder
## 添加字段
方法	                                     说明
increments(name)	                        自增列，会被用作主键
integer(name)	                            int类型
bigInteger(name)	                        bigInt类型
text(name,[textType])	                    文本类型，MySQL下有text，mediumtext，longtext可选
string(name,[length])	                    字符串类型，默认长度255字符
float(name,[precision],[scale])	          浮点类型，默认为8和2
decimal(column,[precision],[scale])	      十进制数类型，默认为8和2
boolean(name)	                            布尔型
date(name)	                              date类型
dateTime(name)	                          dateTime类型
time(name)	                              time类型
timestamp(name,[standard])	              timestamp类型，PostgreSQL下默认为timestampz
timestamps()	                            添加created_at和updated_at字段
binary(name,[length])	                    二进制数类型，MySQL下可选择长度
enu(col,values)	                          枚举类型，第二个参数需要是数组
json(name)	                              json类型，使用pgSQL内建的JSON格式，需要调用JSON.stringify()方法强制转换成JSON格式，在不支持json的数据库中会变成字符串类型
jsonb(name)	                              jsonb类型，可以使用本地的json格式
uuid(name)	                              uuid类型，使用pgSQL内建的uuid类型，不支持的数据库会变成36位的字符串
specificType(column,value)	              添加不支持的类型


## 删改字段

方法	                                     说明
dropColumn(name)                          通过name删除指定的字段
dropColumns(*names)	                      删除多个字段
dropTimestamps()	                        删除时间戳字段
renameColumn(from, to)	                  重命名该字段

## 添加配置信息

方法	                                     说明
comment(value)                            添加注释
engine(val)	                              设置表的引擎，只对MySQL有效，且只能在创建表时调用
charset(val)	                            设置表的字符集，只对MySQL有效，且只能在创建表时调用
collate(val)	                            设置表的简介，只对MySQL有效，且只能在创建表时调用
inherits(val)	                            设置该表的父表，只对PostgreSQL有效，且只能在创建表时调用


## 添加特殊键

方法	                                     说明
index(columns, [indexName], [indexType])	在columns上添加索引，indexName默认为column名，indexType类型在pgsql下可选
unique(columns)	                          添加唯一键
foreign(columns)	                        将已存在的键设置为外键，和references搭配使用

## 删除特殊键

方法	                                     说明
dropIndex(columns, [indexName])	          删除索引
ropUnique(columns, [indexName])	          删除唯一键
dropForeign(columns, [foreignKeyName])	  删除外键
dropPrimary([constraintName])


## 链式操作

有的方法可以进行链式操作，通常是在定义字段的同时，链在末尾完成功能。这些方法都是在column对象上调用。

方法	                                     说明
index([indexName], [indexType])	          将该column设为索引
primary([constraintName])	                将该column设为主键，如果传入多个参数，则设置为联合主键
unique()	                                将该column设为唯一键
references(column)	                      设置外键所引用的表和字段
inTable(table)	                          设置外键所在的表的表名
onDelete(command)	                        设置运行onDelete时的SQL命令
onUpdate(command)	                        设置运行onUpdate时的SQL命令
defaultTo(value)	                        在插入时设置该column的默认值
unsigned()	                              设置该column为无符号整数
notNullable()	                            在创建column的时候设置该字段不可为空
nullable()	                              显式设置该column可以为空，默认都是可以为空
first()	                                  将该column作为表的第一列，只在MySQL aliter表的时候有效
after(field)	                            将该column插入到给定参数之后，只在MySQL aliter表的时候有效
comment(value)	                          为该column添加注释
collate(collation)	                      对该column添加校对器，只对MySQL有效


#Query Builder

Query Builder需要指明query操作对应的table或直接调用knex对象的方法。 
整个构造过程包括，构造sql语句，调用interface方法（接口方法用于执行语句或者转换为字符串打印出来）。

## 基础方法

常规增删改查，运算操作都有对应的方法。

## 查询

select([*columns]) 
column(columns) 
from([tableName])

knex.column('title', 'author', 'year').select().from('books')

// select "title", "author", "year" from "books"

## 插入

insert(data, [returning]) 
returning(column) /returning([column1, column2, ...])

knex('books')
  .returning('id')
  .insert({title: 'Slaughterhouse Five'})

// insert into "books" ("title") values ('Slaughterhouse Five') returning "id"

## 修改

update(data, [returning]) / update(key, value, [returning])

knex('books')
.where('published_date', '<', 2000)
.update({
  status: 'archived',
  thisKeyIsSkipped: undefined
})

// update "books" set "status" = 'archived' where "published_date" < 2000

## 删除

del()

knex('accounts')
.where('activated', false)
.del()

// delete from "accounts" where "activated" = false

##  运算

方法	说明
count(column)	countDistinct
min(column)	
max(column)	
sum(column)	sumDistinct
avg(column)	
increment(column, amount)	
decrement(column, amount)	
4.2 where方法

和SQL语法一样，where用于设置一些约束条件。如果where的内容不存在，则会抛出错误，所以执行之前要确保where的内容是存在的。

##  where(~mixed~)

该方法可以接收多种类型的参数：

## a 对象型

knex('users').where({name:'Bob',age:'20'}).select('id')

// select "id" from "users" where "name" = 'Bob' and "age" = 20

## b 键值对型

knex('users').where('id',111)

// select * from "users" where "id" = 111

## c 操作符型

常用于处理不等关系，包含关系

where('votes', '>', 100)

// select * from "users" where "votes" > 100

## d 回调函数型

处理复杂查询（嵌套查询、并列查询）的时候更简洁

knex('users').where(function() {
  this.where('id', 1).orWhere('id', '>', 10)
})

// select * from "users" where ("id" = 1 or "id" > 10) 

## e 链型

常用于处理复杂查询或条件较多的情况

// 嵌套查询的例子
var subquery = knex('users').where('votes', '>', 100).andWhere('status', 'active').orWhere('name', 'John').select('id');

knex('accounts').where('id', 'in', subquery)

// select * from "accounts" where "id" in (select "id" from "users" where "votes" > 100 and "status" = 'active' or "name" = 'John')

如果orWhere中有多个条件，则这些条件之间是and的关系

## whereNot(~mixed~)

可接收的参数种类与where一样，用法也类似。 
逻辑上需要注意转换就可以了。

## whereNot({first_name: 'Test',last_name:  'User'})

//等价于 where not "first_name" = 'Test' and not "last_name" = 'User'

whereNot不能用in或者between类型的子查询，需要用not in或者not between替代。 
whereNot('id','in',subquery)这种写法是错误的； 
where('id','not in',subquery)这种写法是正确的。

// 嵌套查询的例子
var subquery = knex('users')
  .whereNot('votes', '>', 100)
  .andWhere('status', 'active')
  .orWhere('name', 'John')
  .select('id');

knex('accounts').where('id', 'not in', subquery)

// select * from "accounts" where "id" not in (select "id" from "users" where not "votes" > 100 and "status" = 'active' or "name" = 'John')

## whereIn(column, array|callback|builder)

whereIn('id',subquery)可以用于替代where('id','in',subquery)

## whereNotIn(column, array|callback|builder)

whereNotIn('id',subquery)可以用于替代where('id','not in',subquery)

## whereNull(column)

knex('users').whereNull('updated_at')

// select * from "users" where "updated_at" is null


## whereNotNull(column)

作用和whereNull相反

## whereExists(builder | callback)

// builder可以作为参数传递给另一个builder
knex('users').whereExists(knex.select('*').from('accounts').whereRaw('users.account_id = accounts.id'))

// select * from "users" where exists (select * from "accounts" where users.account_id = accounts.id)


## whereNotExists(builder | callback)

作用和whereExists相反

## whereBetween(column, range)

knex('users').whereBetween('votes', [1, 100])

// select * from "users" where "votes" between 1 and 100


## whereNotBetween(column, range)

作用和whereBetween相反

## whereRaw(query, [bindings])

执行原始的SQL语句

knex('users').whereRaw('id = ?', [1])

// select * from "users" where id = 1

##  having方法

having(column, operator, value)

Adds a having clause to the query.

knex(‘users’) 
.groupBy(‘count’) 
.orderBy(‘name’, ‘desc’) 
.having(‘count’, ‘>’, 100) 
Outputs: 
select * from “users” group by “count” having “count” > 100 order by “name” desc

## havingRaw(column, operator, value)

Adds a havingRaw clause to the query.

knex('users')
.groupBy('count')
.orderBy('name', 'desc')
.havingRaw('count > ?', [100])

// select * from "users" group by "count" having count > 100 order by "name" desc

## groupBy(*names)

Adds a group by clause to the query.

knex('users').groupBy('count')

// select * from "users" group by "count"

## groupBy(sql)

Adds a raw group by clause to the query.

knex.select('year', knex.raw('SUM(profit)')).from('sales').groupByRaw('year WITH ROLLUP')

// select "year", SUM(profit) from "sales" group by year WITH ROLLUP

## orderBy(column, [direction])

Adds an order by clause to the query.

knex('users').orderBy('name', 'desc')

// select * from "users" order by "name" desc

## orderByRaw(sql)

Adds an order by raw clause to the query.

knex.select('*').from('table').orderByRaw('col DESC NULLS LAST')

// select * from "table" order by col DESC NULLS LAST


## join方法

Several methods are provided which assist in building joins.

## join(table, first, [operator], second)

The join builder can be used to specify joins between tables, with the first argument being the joining table, the next three arguments being the first join column, the join operator and the second join column, respectively.

knex('users')
.join('contacts', 'users.id', '=', 'contacts.user_id')
.select('users.id', 'contacts.phone')

//select "users"."id", "contacts"."phone" from "users" inner join "contacts" on "users"."id" = "contacts"."user_id"

```
knex('users')
.join('contacts', 'users.id', 'contacts.user_id')
.select('users.id', 'contacts.phone')
Outputs:
select "users"."id", "contacts"."phone" from "users" inner join "contacts" on "users"."id" = "contacts"."user_id"
```

For grouped joins, specify a function as the second argument for the join query, and use on with orOn or andOn to create joins that are grouped with parentheses.
```
knex.select('*').from('users').join('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
Outputs:
select * from "users" inner join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"
```

For nested join statements, specify a function as first argument of on, orOn or andOn

```js
knex.select('*').from('users').join('accounts', function() {
  this.on(function() {
    this.on('accounts.id', '=', 'users.account_id')
    this.orOn('accounts.owner_id', '=', 'users.id')
  })
})
// Outputs:
// select * from "users" inner join "accounts" on ("accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id")
```

It is also possible to use an object to represent the join syntax.

```js
knex.select('*').from('users').join('accounts', {'accounts.id': 'users.account_id'})
Outputs:
select * from "users" inner join "accounts" on "accounts"."id" = "users"."account_id"
```
If you need to use a literal value (string, number, or boolean) in a join instead of a column, use knex.raw.

```js
knex.select('*').from('users').join('accounts', 'accounts.type', knex.raw('?', ['admin']))
Outputs:
select * from "users" inner join "accounts" on "accounts"."type" = 'admin'
```
## innerJoin(column, ~mixed~)

knex.from('users').innerJoin('accounts', 'users.id', 'accounts.user_id')
Outputs:
select * from "users" inner join "accounts" on "users"."id" = "accounts"."user_id"

knex.table('users').innerJoin('accounts', 'users.id', '=', 'accounts.user_id')
Outputs:
select * from "users" inner join "accounts" on "users"."id" = "accounts"."user_id"

knex('users').innerJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
Outputs:
select * from "users" inner join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"

## leftJoin(column, ~mixed~)

knex.select('*').from('users').leftJoin('accounts', 'users.id', 'accounts.user_id')
Outputs:
select * from "users" left join "accounts" on "users"."id" = "accounts"."user_id"

knex.select('*').from('users').leftJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
Outputs:
select * from "users" left join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"

## leftOuterJoin(column, ~mixed~)

knex.select('*').from('users').leftOuterJoin('accounts', 'users.id', 'accounts.user_id')
Outputs:
select * from "users" left outer join "accounts" on "users"."id" = "accounts"."user_id"

knex.select('*').from('users').leftOuterJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
Outputs:
select * from "users" left outer join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"

## rightJoin(column, ~mixed~)
```js
knex.select('*').from('users').rightJoin('accounts', 'users.id', 'accounts.user_id')
Outputs:
select * from "users" right join "accounts" on "users"."id" = "accounts"."user_id"
```
```js
knex.select('*').from('users').rightJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
Outputs:
select * from "users" right join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"
```

## rightOuterJoin(column, ~mixed~)
```js
knex.select('*').from('users').rightOuterJoin('accounts', 'users.id', 'accounts.user_id')
Outputs:
select * from "users" right outer join "accounts" on "users"."id" = "accounts"."user_id"
```
```js
knex.select('*').from('users').rightOuterJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
Outputs:
select * from "users" right outer join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"
```

## outerJoin(column, ~mixed~)
```js
knex.select('*').from('users').outerJoin('accounts', 'users.id', 'accounts.user_id')
Outputs:
select * from "users" outer join "accounts" on "users"."id" = "accounts"."user_id"
```

```js
knex.select('*').from('users').outerJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
Outputs:
select * from "users" outer join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"
```

## fullOuterJoin(column, ~mixed~)
```js
knex.select('*').from('users').fullOuterJoin('accounts', 'users.id', 'accounts.user_id')
Outputs:
select * from "users" full outer join "accounts" on "users"."id" = "accounts"."user_id"
```
```js
knex.select('*').from('users').fullOuterJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
Outputs:
select * from "users" full outer join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"
```

## crossJoin(column, ~mixed~)

```js
knex.select('*').from('users').crossJoin('accounts', 'users.id', 'accounts.user_id')
Outputs:
select * from "users" cross join "accounts" on "users"."id" = "accounts"."user_id"
```

```js
knex.select('*').from('users').crossJoin('accounts', function() {
  this.on('accounts.id', '=', 'users.account_id').orOn('accounts.owner_id', '=', 'users.id')
})
Outputs:
select * from "users" cross join "accounts" on "accounts"."id" = "users"."account_id" or "accounts"."owner_id" = "users"."id"
```

## joinRaw(sql, [bindings])

```js
knex.select('*').from('accounts').joinRaw('natural full join table1').where('id', 1)
Outputs:
select * from "accounts" natural full join table1 where "id" = 1
```

```js
knex.select('*').from('accounts').join(knex.raw('natural full join table1')).where('id', 1)
Outputs:
select * from "accounts" inner join natural full join table1 where "id" = 1
```

## 其他方法

除了以上归类的方法之外，还有一些常用的方法。

## timeout(ms, options={cancel: boolean})

该方法只有MySQL可用。 
为SQL操作设定一个计时器，单位是毫秒，超时后抛出异常TimeoutError 
cancel为true表示超时就取消请求。

## as(name)

用于给子查询命名，提高可读性。

## with(alias, function|raw)

该方法在PostgreSQL, Oracle, SQLite3和MSSQL上都可用。 
也用于给子查询命名。

```
knex.with('with_alias', knex.raw('select * from "books" where "author" = ?', 'Test')).select('*').from('with_alias')
// with "with_alias" as (select * from "books" where "author" = 'Test') select * from "with_alias"
```

## withSchema([schemaName])

指明数据表属于的schema。

```js
knex.withSchema('public').select('*').from('users')
// select * from "public"."users"
```

## Clear Methods:
distinct() 
offset(value) 
limit(value) 
union([*queries], [wrap]) 
unionAll(query) 
truncate() 
pluck(id) 
first([columns]) 
clone() 
modify(fn, *arguments) 
columnInfo([columnName]) 
debug([enabled]) 
connection(dbConnection) 
options()
