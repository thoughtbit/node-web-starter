import Promise from 'bluebird'
import db from './helpers/db/mysql'

function truncate(knex, Promise, tables) {
  return Promise.each(tables, table =>
    knex.raw(`TRUNCATE TABLE ${table}`),
  )
}

const tables = [
  'role',
  'user',
  'tag',
  'article',
  'setting',
  'user_social_media',
  'article_tag',
  'user_role',
]

const createTables = {
  up: async (db) => {
    await db.schema.createTable('role', (table) => {
      // pk
      table.increments('id').unsigned().primary()
      // uuid
      table.uuid('uuid').notNullable()

      table.string('name', 64).notNullable().unique()
      table.string('image', 200).nullable()
      table.text('description').nullable()

      table.timestamp('createdAt').notNullable().defaultTo(db.fn.now())
      table.timestamp('updatedAt').nullable().defaultTo(null)
      // indexes
      table.index('name')
      table.index('uuid')
    })

    await db.schema.createTable('user', (table) => {
      // pk
      table.uuid('id').notNullable().primary()

      table.string('email', 100).unique().notNullable()
      table.string('password', 64).notNullable()
      table.string('username', 115).unique().notNullable()
      table.string('avatarUrl', 255).defaultTo('https://avatars0.githubusercontent.com/u/1026216?v=4&s=460')
      table.string('website', 100).nullable()
      table.boolean('verified').defaultTo(0)

      table.timestamp('createdAt').notNullable().defaultTo(db.fn.now())
      table.timestamp('updatedAt').nullable().defaultTo(null)
      table.timestamp('deletedAt').nullable().defaultTo(null)
      // fk

      // indexes
      table.index('username')
      table.index('verified')
      table.index('email')
    })

    await db.schema.createTable('tag', (table) => {
      table.increments('id').unsigned().primary()
      // uuid
      table.uuid('uuid').notNullable()
      table.string('name').notNullable().unique()
      table.string('description').nullable()
      table.timestamp('createdAt').notNullable().defaultTo(db.fn.now())
      table.timestamp('updatedAt').nullable().defaultTo(null)
      table.timestamp('deletedAt').nullable().defaultTo(null)

      table.index('name')
    })

    await db.schema.createTable('article', (table) => {
      // pk | uuid
      table.uuid('id').notNullable().primary()
      table.string('title', 140).unique().notNullable()
      table.string('slug', 140).unique().notNullable()
      table.text('content').notNullable()
      table.text('excerpt').notNullable()
      table.uuid('userId') // .unsigned().notNullable()
      table.boolean('published').defaultTo(0)
      table.timestamp('createdAt').notNullable().defaultTo(db.fn.now())
      table.timestamp('updatedAt').nullable().defaultTo(null)
      table.timestamp('deletedAt').nullable().defaultTo(null)
      // fk | uuid
      table
        .foreign('userId')
        .references('id')
        .inTable('user')
        .onDelete('cascade')
        .onUpdate('cascade')

      table.index('slug')
      table.index('published')
      table.index('createdAt')
    })

    await db.schema.createTable('setting', (table) => {
      table.increments('id').unsigned().primary()
      table.string('key', 100).notNullable()
      table.string('label', 100).notNullable()
      table.string('value', 255).notNullable()
      table.string('description', 255).notNullable()
      table.timestamp('createdAt').notNullable().defaultTo(db.fn.now())
      table.timestamp('updatedAt').nullable().defaultTo(null)

      table.index('key')
      table.index('value')
    })

    await db.schema.createTable('user_social_media', (table) => {
      table.increments('id').unsigned().primary()
      table.uuid('userId') // .unsigned().notNullable()
      table.string('googleUrl', 255).notNullable()
      table.string('githubUrl', 255).notNullable()
      table.timestamp('createdAt').notNullable().defaultTo(db.fn.now())
      table.timestamp('updatedAt').nullable().defaultTo(null)
    })

    await db.schema.createTable('article_tag', (table) => {
      table.increments('id').primary()
      table.uuid('articleId') // .unsigned().notNullable()
      table.integer('tagId') // .unsigned().notNullable()
      table.timestamp('createdAt').notNullable().defaultTo(db.fn.now())
      table.timestamp('updatedAt').nullable().defaultTo(null)
      table.unique(['articleId', 'tagId'])
      table
        .foreign('articleId')
        .references('id')
        .inTable('article')
        .onDelete('cascade')
        .onUpdate('cascade')
      // table
      //   .foreign('tagId')
      //   .references('id')
      //   .inTable('tag')
      //   .onDelete('cascade')
      //   .onUpdate('cascade')
    })

    await db.schema.createTable('user_role', (table) => {
      table.increments('id').primary()
      table.uuid('userId') // .unsigned().notNullable()
      table.integer('roleId') // .unsigned().notNullable()
      table.timestamp('createdAt').notNullable().defaultTo(db.fn.now())
      table.timestamp('updatedAt').nullable().defaultTo(null)
      table.unique(['userId', 'roleId'])
      table
        .foreign('userId')
        .references('id')
        .inTable('user')
        .onDelete('cascade')
        .onUpdate('cascade')
      // table
      //   .foreign('roleId')
      //   .references('id')
      //   .inTable('role')
      //   .onDelete('cascade')
      //   .onUpdate('cascade')
    })
  },
  down: async (db) => {
    await db.schema.dropTableIfExists('role')
    await db.schema.dropTableIfExists('user')
    await db.schema.dropTableIfExists('tag')
    await db.schema.dropTableIfExists('article')
    await db.schema.dropTableIfExists('setting')
    await db.schema.dropTableIfExists('user_social_media')
    await db.schema.dropTableIfExists('article_tag')
    await db.schema.dropTableIfExists('user_role')
  },
  seed: (db, Promise) => truncate(db, Promise, tables)
    .then(() =>
      Promise.all([
        knex('role').insert({
          name: 'Admin',
          description: '超级管理员',
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        knex('user').insert({
          id: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
          email: 'admin@bear.io',
          password: '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka',
          username: 'Kims',
          avatarUrl: 'avatar.png',
          website: 'https://moocss.com',
          verified: 0,
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        knex('user_social_media').insert({
          userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
          facebookUrl: 'https://facebook.com',
          githubUrl: 'https://github.com',
          googleUrl: 'https://google.com',
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        knex('tag').insert({
          name: 'javascript',
          description: 'JS',
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        knex('article').insert({
          id: '5c9ed236-79f0-4ff7-93bd-2815f06c74b4',
          title: 'Just Another Post',
          slug: 'just-another-post',
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
            'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
            'an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          content: `<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>`,
          published: 0,
          userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        knex('article_tag').insert({
          articleId: '5c9ed236-79f0-4ff7-93bd-2815f06c74b4',
          tagId: 2,
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        knex('user_role').insert({
          userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
          roleId: 3,
        }),
      ]),
    )
    .then(() =>
      Promise.all([
        knex('setting').insert({
          key: 'siteName',
          label: 'Site Name',
          value: 'Bear',
          description: 'The website name.',
        }),
      ]),
    ),
}

// createTables.down(db)
// createTables.up(db)
createTables.seed(db, Promise)
