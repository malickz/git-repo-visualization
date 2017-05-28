--
-- File generated with SQLiteStudio v3.1.1 on Sat May 6 20:39:11 2017
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: commits
CREATE TABLE commits (cid INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT, sha TEXT, authormail TEXT, authorname TEXT, authordate TEXT, committername TEXT, committermail TEXT, committerdate TEXT, summary TEXT, ismerge BOOLEAN);

-- Table: line_blame_info
CREATE TABLE line_blame_info (lid INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT, sha TEXT, originalline TEXT, finalline TEXT, fetchdate TEXT, contentlength INTEGER);

-- Table: tree_structure
CREATE TABLE tree_structure (fid INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT, sha TEXT, parent TEXT, filename TEXT, ext TEXT, loc INTEGER, fetchdate TEXT);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
