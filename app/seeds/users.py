from app.models import db, User, environment, SCHEMA, Method,Category,Games,Cart,Reviews
from sqlalchemy.sql import text

# PROBABLY NEED A JOIN TABLE FOR MANY TO MANY FOR METHOD/CATEGORY TO GAMES do they can have many categories and methods per game

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
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
        category_id=1, method_id=3, name='Cars Against Humanity', max_players=20,min_players=2,min_age=17,price=14.99, image='https://cdn.sanity.io/images/vc07edlh/production/a5b22a9d2e9d51bf324efb92a143aaa9f3ffff45-1400x1260.png',description="Cards Against Humanity is an adult party game in which players complete fill-in-the-blank statements, using words or phrases typically deemed offensive, risqué, or politically incorrect, printed on playing cards.")
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
    review1 = Reviews(
        user_id = 1,game_id=1,content='This was fun',stars=2)
    cart1 = Cart(
        user_id = 1,game_id=1,quantity=2)


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()
    db.session.add_all([method1, method2,method3,method4,method5,method6])
    db.session.commit()
    db.session.add_all([category1, category2,category3,category4,category5,category6,category7])
    db.session.commit()
    db.session.add_all([game1, game2,game3,game4,game5,game6,game7,game8,game9,game10])
    db.session.commit()
    db.session.add(review1)
    db.session.commit()
    db.session.add(cart1)
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
