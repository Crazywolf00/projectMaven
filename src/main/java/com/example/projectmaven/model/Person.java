package com.example.projectmaven.model;

public class Person {

    private String nickname;

    private int activities;


    public Person(String nickname) {
        this.nickname = nickname;
        this.activities = 0;
    }

    public void active() {
        activities++;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public int getActivities() {
        return activities;
    }

    public void setActivities(int activities) {
        this.activities = activities;
    }
}
