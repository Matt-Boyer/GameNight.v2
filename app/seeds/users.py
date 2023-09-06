from app.models import db, User, environment, SCHEMA, Method,Category,Games,Cart,Reviews,WishList
from sqlalchemy.sql import text

# PROBABLY NEED A JOIN TABLE FOR MANY TO MANY FOR METHOD/CATEGORY TO GAMES do they can have many categories and methods per game

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', friends='2,3', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    method1 = Method(
        name='Computer')
    method2 = Method(
        name='Board Game')
    method3 = Method(
        name='Cards')
    method4 = Method(
        name='PS5')
    method5 = Method(
        name='X-Box')
    method6 = Method(
        name='Pen & Paper')
    category1 = Category(
        name= 'Adult/Drinking Games')
    category2 = Category(
        name= 'Family/Kids')
    category3 = Category(
        name= 'Competitive')
    category4 = Category(
        name= 'Strategy')
    category5 = Category(
        name= 'Adventure')
    category6 = Category(
        name= 'Shooter')
    category7 = Category(
        name= 'Racing')
    game1 = Games(
        category_id=2, method_id=1, name='Tower Fall', max_players=4,min_players=1,min_age=7,price=19.99,image='https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/t/towerfall-switch/hero',description="TowerFall is an archery combat arena game where players kill each other with arrows and head-stomps until only one player remains. It is also possible to play in cooperative mode. In multiplayer, up to four players fight in an arena using a limited supply of arrows.")
    game2 = Games(
        category_id=2, method_id=2, name='Ticket To Ride', max_players=4,min_players=2,min_age=6,price=23.49,image='https://upload.wikimedia.org/wikipedia/en/9/92/Ticket_to_Ride_Board_Game_Box_EN.jpg',description="Ticket to Ride is a cross-country train adventure in which players collect and play matching train cards to claim railway routes connecting cities through North America! The original Ticket to Ride is perfect for an experienced tabletop enthusiast, families, and those new to the hobby.")
    game3 = Games(
        category_id=3, method_id=3, name='Cars Against Humanity', max_players=20,min_players=2,min_age=17,price=14.99, image='https://cdn.sanity.io/images/vc07edlh/production/a5b22a9d2e9d51bf324efb92a143aaa9f3ffff45-1400x1260.png',description="Cards Against Humanity is an adult party game in which players complete fill-in-the-blank statements, using words or phrases typically deemed offensive, risqué, or politically incorrect, printed on playing cards.")
    game4 = Games(
        category_id=3, method_id=4, name='Mortal Kombat 5', max_players=2,min_players=1,min_age=17,price=47.99, image='https://m.media-amazon.com/images/I/819SHNH35RL.jpg',description="It is the fifth main installment in the Mortal Kombat franchise and a sequel to 1997's Mortal Kombat 4. Its story focuses on the eponymous alliance between sorcerers Quan Chi and Shang Tsung and their schemes to revive an ancient army to conquer Outworld and Earthrealm.")
    game5 = Games(
        category_id=4, method_id=2, name='Chess', max_players=2,min_players=2,min_age=7,price=13.99,image='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Chess_board_opening_staunton.jpg/1200px-Chess_board_opening_staunton.jpg',description="Chess is a game played between two opponents on opposite sides of a board containing 64 squares of alternating colors. Each player has 16 pieces: 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights, and 8 pawns. The goal of the game is to checkmate the other king.")
    game6 = Games(
        category_id=5, method_id=5, name='Hogwarts Legacy', max_players=1,min_players=1,min_age=13,price=48.99,image='https://cms.gameflycdn.com/proxy/gf/boxart/320w/5035301.jpg',description="Hogwarts Legacy - Home. Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books. For the first time, experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart.")
    game7 = Games(
        category_id=6, method_id=5, name='Halo', max_players=4,min_players=1,min_age=16,price=59.99,image='https://m.media-amazon.com/images/I/71pVqC4lxwL.jpg',description="Halo Infinite is a first-person shooter. In the game's story mode, players assume the role of player character Master Chief, as he wages a war against the Banished, an alien faction. Players traverse the open world Zeta Halo, fighting the Banished with a mixture of vehicles and weapons.")
    game8 = Games(
        category_id=7, method_id=1, name='Forza 5', max_players=4,min_players=1,min_age=6,price=39.99, image='https://store-images.s-microsoft.com/image/apps.23625.13806078025361171.9723cf5e-1e29-4d9d-ad0a-cc37a95bb75d.e02f4ead-d89b-45cd-8eb5-5dcbf44ae91f?q=90&w=256&h=384&mode=crop&format=jpg&background=%23FFFFFF',description="Forza Horizon 5 is a racing video game set in an open world environment based in a fictional representation of Mexico. The game has the largest map in the entire Forza Horizon series, being 50% larger than its predecessor, Forza Horizon 4, while also having the highest point in the Horizon series.")
    game9 = Games(
        category_id=2, method_id=6, name='Charrades', max_players=20,min_players=2,min_age=5,price=0,image='https://www.gamesver.com/wp-content/uploads/2020/02/Illustration-of-Kids-Playing-Charades-1024x576.jpg.webp',description="Charades is a word guessing game where one player has to act out a word or action without speaking and other players have to guess what the action is. It's a fun game that's popular around the world at parties.")
    game10 = Games(
        category_id=1, method_id=3, name='Kings Cup', max_players=10,min_players=2,min_age=21,price=4.99, image = 'https://happyhourhelp.com/wp-content/uploads/2021/06/Waterfall-Drinking-Game-Guide-Rules-Kings-Cup-e1622832935875.png', description="Kings (also known as king's cup, donut, circle of death or ring of fire) is a drinking game using playing cards. Players must drink and dispense drinks based on cards drawn. The cards have predetermined drink rules prior to the game's beginning. Often groups establish house rules with their own game variations.")
    game11 = Games(
        category_id=1, method_id=2, name='Drink a Palooza', max_players=12,min_players=2,min_age=21,price=29.99, image = 'https://m.media-amazon.com/images/I/91L2-XNQ1RL.jpg', description="It combines old-school and new-school drinking games featuring beer pong, flip cup, kings cup card games and more. Whether you prefer beer, water, soda or spirits, you can enjoy this game. This fun adult drinking game lets you party anywhere and play everywhere.")
    game12 = Games(
        category_id=1, method_id=2, name='Drunk Tank', max_players=12,min_players=2,min_age=21,price=40.00, image = 'https://drunkinlovedrinkinggame.com/cdn/shop/files/9_e80e0bcf-21bd-4dc3-a7b1-6d00a5555f0c.png?v=1685574712&width=1445', description="DRUNK TANK is the ULTIMATE drinking game for groups. The interactive party board enables groups of 3 or more to get involved at the pregame! DRUNK TANK combines some of your favorite classic drinking games with new and unique prompts & challenges.")
    game13 = Games(
        category_id=2, method_id=3, name='Do You Really Know Your Family?', max_players=8,min_players=3,min_age=5,price=24.99, image = 'https://m.media-amazon.com/images/I/71HhBMdgrLL.jpg', description="Take turns drawing a card and reading the question about yourself out loud. Whoever answers the question correctly gets to keep the card. If a challenge card is drawn, anyone who successfully does it gets to keep the card. First person to collect 15 cards wins... and really knows the family best!")
    game14 = Games(
        category_id=3, method_id=2, name='Exploding Kittens', max_players=5,min_players=2,min_age=7,price=19.99, image = 'https://m.media-amazon.com/images/I/71GXoP2+r8L._AC_UF894,1000_QL80_.jpg', description="In this highly-strategic, kitty-powered card game, players draw cards until someone draws an exploding kitten, at which point They explode, they are Dead, and they are out of the game - unless that player has a defuse card, which can defuse the kitten using things like laser pointers, belly rubs, and catnip sandwiches.")
    game14 = Games(
        category_id=5, method_id=2, name='Sea of Thieves: Voyage of Legends Board Game', max_players=4,min_players=2,min_age=14,price=59.99, image = 'https://cf.geekdo-images.com/TzgLPLbbqbjPdNqBLQWd-g__opengraph/img/hyNC-uzw5BE0Jp0X6g_Q0GmabyA=/0x2402:6772x5958/fit-in/1200x630/filters:strip_icc()/pic7651270.png', description="Inspired by the hit video game, Sea of Thieves: Voyage of Legends is a competitive seafaring game of piracy for 2-4 players. Explore the high seas with your friends in voyages packed with danger and excitement, but don't forget - only one of you can be crowned a Pirate Legend.")
    game15 = Games(
        category_id=6, method_id=2, name='Adrenaline', max_players=5,min_players=3,min_age=14,price=41.99, image = 'https://cf.geekdo-images.com/TiNI7bUCR2RPFMlvKEC9TQ__opengraph/img/j-wyQzFtUk-RwD83rbeN7GCQj00=/0x0:4323x2270/fit-in/1200x630/filters:strip_icc()/pic3476604.jpg', description="Your goal in Adrenaline is simple. Shoot your opponents and try to score as many points as possible. Each round players will be moving around the board, picking up weapons and ammo, and trying to shoot as many other players as possible.")
    game16 = Games(
        category_id=7, method_id=2, name='Thunder Road: Vendetta', max_players=4,min_players=2,min_age=10,price=50.00, image = 'https://ksr-ugc.imgix.net/assets/036/185/798/82ef59f2af9675c976c561c95d21957b_original.jpg?ixlib=rb-4.1.0&crop=faces&w=1024&h=576&fit=crop&v=1643292181&auto=format&frame=1&q=92&s=58501adaa46457109e29344459421dd5', description="Thunder Road: Vendetta is a revved-up restoration of the classic 1986 game of mayhem on the asphalt. Grab your crew, roll your dice, race your cars, shoot your guns, and try not to get wrecked. This new version features exciting new additions, including random hazard tokens, such as wrecks, oil slicks, and more.")
    game17 = Games(
        category_id=1, method_id=1, name='Drunk Pirate', max_players=99,min_players=2,min_age=10,price=0, image = 'https://curiocity.com/wp-content/uploads/2021/03/drunkpirate.jpg', description="The game is simple: Flip the card and do what it says. Some cards are simple and some are rules that last multiple turns.")
    game18 = Games(
        category_id=3, method_id=1, name='League of Legends', max_players=10,min_players=2,min_age=13,price=0, image = 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltbea9cc1f28bf54ea/638f88446e37161066eeda9d/Riot-Games-Xbox-Game-Pass-Benefits_banner_opt.jpg', description="League of Legends is one of the world's most popular video games, developed by Riot Games. It features a team-based competitive game mode based on strategy and outplaying opponents. Players work with their team to break the enemy Nexus before the enemy team breaks theirs.")
    game19 = Games(
        category_id=4, method_id=1, name='Age of Empires IV', max_players=8,min_players=1,min_age=12,price=21.99, image = 'https://cdn.akamai.steamstatic.com/steam/apps/1466860/capsule_616x353.jpg?t=1692823079', description="The fourth installment in the Age of Empires real-time strategy game series, developed by Relic Entertainment, focused on historic events set in the Middle Ages. The game features eight civilizations: Chinese, Delhi Sultanate, English, Mongols, French, Abbasid Dynasty, Holy Roman Empire, and Rus.")
    game20 = Games(
        category_id=5, method_id=1, name='Broken Age', max_players=1,min_players=1,min_age=10,price=14.99, image = 'https://i0.wp.com/indie-hive.com/wp-content/uploads/2020/01/Broken-Age-Key-Art.jpg?resize=752%2C440&ssl=1', description="A family friendly, hand-animated, puzzle-filled adventure game with an all-star cast, including Elijah Wood, Jack Black and Masasa Moyo. Funded by a record breaking crowdfunding campaign and designed by industry legend Tim Schafer, Broken Age is a timeless coming-of-age story.")
    game21 = Games(
        category_id=6, method_id=1, name='Counter Strike: Global Offensive', max_players=32,min_players=2,min_age=10,price=0, image = 'https://cdn.cloudflare.steamstatic.com/steam/apps/10/capsule_616x353.jpg?t=1666823513', description="Counter-Strike (CS) is a series of multiplayer tactical first-person shooter video games in which teams of terrorists battle to perpetrate an act of terror (bombing, hostage-taking, assassination) while counter-terrorists try to prevent it (bomb defusal, hostage rescue, escort mission).")
    game22 = Games(
        category_id=2, method_id=2, name='Life', max_players=4,min_players=2,min_age=10,price=19.79, image = 'https://m.media-amazon.com/images/I/81A0K5YsuxL._AC_UF894,1000_QL80_.jpg', description="The Game of Life was US's first popular parlour game. The game simulates a person's travels through their life, from early adulthood to retirement, with college if necessary, jobs, marriage, and possible children along the way. Up to six players, depending on the version, can participate in a single game.")
    game22 = Games(
        category_id=4, method_id=3, name='Pokemon', max_players=2,min_players=2,min_age=7,price=12.89, image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg/1200px-Pok%C3%A9mon_Trading_Card_Game_logo.svg.png', description="The Pokémon Trading Card Game is a 2-player game in which players use 60-card decks to battle. In the Pokémon TCG, players build decks around cards that feature Pokémon characters, and then take turns using attacks to try to defeat their opponent.")
    review1 = Reviews(
        user_id = 1,game_id=1,content='This was fun',stars=5)
    review2 = Reviews(
        user_id = 2,game_id=1,content='It did not fit in my DVD player. Do not recommend',stars=2)
    cart1 = Cart(
        user_id = 1,game_id=1,quantity=2)
    wishlist1 = WishList(
        user_id = 1,game_id=1)


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()
    db.session.add_all([method1, method2,method3,method4,method5,method6])
    db.session.commit()
    db.session.add_all([category1, category2,category3,category4,category5,category6,category7])
    db.session.commit()
    db.session.add_all([game1, game2,game3,game4,game5,game6,game7,game8,game9,game10,game11, game12,game13,game14,game15,game16,game17,game18,game19,game20,game21,game22])
    db.session.commit()
    db.session.add(review1)
    db.session.commit()
    db.session.add(review2)
    db.session.commit()
    db.session.add(cart1)
    db.session.commit()
    db.session.add(wishlist1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.category RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.method RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart"))
        db.session.execute(text("DELETE FROM reviews"))
        db.session.execute(text("DELETE FROM games"))
        db.session.execute(text("DELETE FROM category"))
        db.session.execute(text("DELETE FROM method"))
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
