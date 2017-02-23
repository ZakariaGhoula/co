BEGIN

    DECLARE id_bi INT;
    DECLARE id_about INT;
    
    #about
    INSERT INTO about( content) VALUES ( '');
    SELECT LAST_INSERT_ID() into id_about;
    INSERT INTO profile_about (id_about,id_profile, online,ordering)VALUES  (id_about,NEW.id_profile,1,1);
         
    #basic information
    INSERT INTO basic_information (looking_for,looking_where,title) VALUES( ' ',' ',' ');
    SELECT LAST_INSERT_ID() into id_bi;
    INSERT INTO profile_basic_information(id_basic_information,id_profile, online,ordering) VALUES (id_bi,NEW.id_profile,1,1);


end