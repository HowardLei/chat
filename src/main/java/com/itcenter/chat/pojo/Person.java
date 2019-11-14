package com.itcenter.chat.pojo;

/**
 * Person class
 *
 * @author apple
 * @date 2019/11/13
 */
public class Person {
    private Integer id;
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) {
            return false;
        }

        Person person = (Person) o;

        if (!id.equals(person.id)) {
            return false;
        }
        return name.equals(person.name);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + name.hashCode();
        return result;
    }
}
