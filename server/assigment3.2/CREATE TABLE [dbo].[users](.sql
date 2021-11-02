CREATE TABLE [dbo].[users](
	[username] [varchar](30) NOT NULL UNIQUE,
	[password] [varchar](300) NOT NULL,
	[firstname] [varchar](300) NOT NULL,
	[lastname] [varchar](300) NOT NULL,
	[email] [varchar](300) NOT NULL,
	[country] [varchar](300) NOT NULL,
	[photoUrl] [varchar](max) NOT NULL
);

select * from watched;
DROP TABLE users;

CREATE TABLE [dbo].[myRecipe](
	[username] [varchar](30) NOT NULL ,
	[id] [varchar](30) NOT NULL ,
	[image] [varchar](max) NOT NULL,
	[title] [varchar](300) NOT NULL,
	[readyInMinutes] [varchar](300) NOT NULL,
	[aggregateLikes] [varchar](300) NOT NULL,
	[vegan] [bit] NOT NULL,
	[vegetarian] [bit] NOT NULL,
	[glutenFree] [bit] NOT NULL,
	[groceries] [varchar](max) NOT NULL,
	[instruction] [varchar](max) NOT NULL,
	[quantity] [varchar](300) NOT NULL,
	[favorites] [bit] NOT NULL,
	[watched] [bit] NOT NULL,

	PRIMARY KEY (username,id)
);

INSERT INTO myRecipe  
VALUES('pppp', '787877',
'https://www.frogi.co.il/picserver/s/1117/fotolia_136017843_subscription_monthly_m_rashit.jpg',
'burger' ,'0:30 hours' , '5000', 'False', 'False', 'False', 'burger, buns',
'1. put the burger on the grill 2. when it ready put in the buns','1 person','0','1'
);

INSERT INTO myRecipe  
VALUES('peleg','1111','blabla','Matzah brei' ,'15 minutes' ,'22', '1''
Matzah , egg','addInstruction','4','6','1','1','1','1'
);

INSERT INTO myRecipe  
VALUES('peleg', 'evening', 'Malawi' ,'10 minutes' , '
Malawi,labane','addInstruction','4','6','1','1','1','1'
);

INSERT INTO myRecipe  
VALUES('peleg', 'breakfast', 'toast' ,'5 minutes' , '
pesto,cheese,bread,salt,pepper','addInstruction','4','6','1','1','1','1'
);

INSERT INTO myRecipe  
VALUES('shachar', 'Hanukkah', 'sufgania' ,'1:30 hours' , '
oil and flour','addInstruction','4','6','1','1','1','1'
);

INSERT INTO myRecipe  
VALUES('shaTempp', 'breakfast', 'omelet' ,'10 minutes' , '
egg,salt,pepper','addInstruction','4','6','1','1','1','1'
);

INSERT INTO myRecipe  
VALUES('shachar', 'evening', 'salad' ,'20 hours' , '
cucumber,onion,tomato,salt,pepper','addInstruction','4','6','1','1','1','1'
);

CREATE TABLE [dbo].[familyRecipe](
	[username] [varchar](30) NOT NULL ,
	[owner] [varchar](30) NOT NULL ,
	[whenWeMake] [varchar](30) NOT NULL ,
	[name] [varchar](300) NOT NULL,
	[timeToMake] [varchar](300) NOT NULL,
	[ingredients] [nvarchar](max) NOT NULL,
	[instruction] [nvarchar](max) NOT NULL,
	[quantity] [varchar](300) NOT NULL,
);

DROP TABLE myRecipe;

INSERT INTO familyRecipe  
VALUES('shachar','liat meretz', 'passover', '-13','','makluba' ,'1:30 hours' ,'3', '0','1','1','2 cup of rice,' + CHAR(13) + CHAR(10) + '1 chicken,4 potato,1 big cauliflower,2 eggplant,4 carrot,1/2 spoon of salt, 1/4 spoon of pepper','1.cut all the vegetables to small pieces '+CHAR(10) +
'2.start fry the onion on a small fire 3.after the onion get a yellow color add the garlic , potato  , eggplant and carrot. 4.when the potato start to be soft add the chicken and fry it for 15 minutes.' + CHAR(13) + CHAR(10) + ' 5.add the rice with 2 cups of water. 6.when the water start to boiled add the cauliflower. 7.add salt and paper and let tit rest for 1 hour on small fire 8.bon apetite','4 people','0','0'
);

INSERT INTO familyRecipe  
VALUES('peleg','anat biton', 'in camping', 'falafel' ,'1:30 hours' , '2 cups of Hummus,1 bottle of oil,5 stalk of coriander,6 stalk of parsley,2 onion,1 garlic head ,1 spoon of spicy paprika,1/2 cuspoonp of cumin,2 spoon of soda water,1/2 spoon of salt, 1/4 spoon of pepper','1.cut the onion to small pieces 2.put the coriander,parsley,onion,garlic,paprika,cumin and the soda water in the blender and grind it until it become a mixture 3.start heat oil in a pan and make falafels balls from the mixture you make before. 4.when the oil start bubble enter the falafel boil into it. 5.when the falafel ball become a little bit dark take it out from the oil 6.bon apetite','8 people'
);

INSERT INTO familyRecipe  
VALUES('peleg','sara biton', 'friday night', 'Chraime' ,'3 hours' , '2 Tilapia fish,8 tomato,3 Hot Pepper,1 garlic head , 5 stalk of criander , 6 stalk of parsley ,1/2 spoon of salt, 1/4 spoon of pepper','1.cut the tomato to small pieces. 2.start fry the tomato and after it start boiled add the garlic and the hot pepper. 3.when the liquid reduced add the fish (skin on the pan). 4.put the leaves on the fish and close the pan with a cover. 5.change to low heat and let it stay for 1 hour. 6.bon apetite ','6 people'
);




CREATE TABLE [dbo].[favorites](
	[username] [varchar](30) NOT NULL,
	[idRecipe] [varchar](30) NOT NULL,
);

CREATE TABLE [dbo].[watched](
	[username] [varchar](30) NOT NULL,
	[idRecipe] [varchar](30) NOT NULL,
	[lastModify] DATETIME NOT NULL,
);

INSERT INTO recipes  
VALUES('999997', 'https://www.foodisgood.co.il/wp-content/uploads/2015/03/shnitzeltiras.jpg', 'Corn Schnitzel', '60', '99.0', 'FALSE' , 'TRUE', 'FALSE', 'some groceries', 'Put love in it', '8'
);
INSERT INTO watched  
VALUES('peleg', '644800', '20200303 11:12:13 AM' 
);
INSERT INTO watched  
VALUES('peleg', '639865', '20200303 11:12:13 AM' 
);
SELECT * from familyRecipe;

INSERT INTO favorites  
VALUES('pelbit', '640352' 
);

INSERT INTO favorites  
VALUES('pelbit', '639865' 
);

INSERT INTO favorites  
VALUES('pelbit', '644800' 
);

INSERT INTO favorites  
VALUES('pelbit', '559251' 
);

INSERT INTO favorites  
VALUES('pelbit', '492560' 
);
CREATE TABLE [dbo].[Diet](
	[name] [varchar](30) NOT NULL UNIQUE,
);

SELECT * FROM favorites;

INSERT INTO Diet  
VALUES('Whole30
');

INSERT INTO users  
VALUES('temp
','','','','','','','');

EXEC sp_rename 'Diet' , 'Cuisines'


TRUNCATE TABLE favorites;

















DROP TABLE Cuisines