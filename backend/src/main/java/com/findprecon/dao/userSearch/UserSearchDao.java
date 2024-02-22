package com.findprecon.dao.userSearch;

import com.findprecon.model.RegistrationModel;
import com.findprecon.model.Role;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserSearchDao {

    private final EntityManager em;



    public List<RegistrationModel> findAllSimpleQuery(
            String name,
            String email,
            Role role
            ){
        CriteriaBuilder  criteriaBuilder= em.getCriteriaBuilder();
        CriteriaQuery<RegistrationModel> criteriaQuery=criteriaBuilder.createQuery(RegistrationModel.class);


//        select from resistrationmodel

        Root<RegistrationModel> root =criteriaQuery.from(RegistrationModel.class);

        //prepare WHERE clause
        //WHERE name like %ajay%


        Predicate namePredicate= criteriaBuilder.like(root.get("name"), "%"+name+"%");
        Predicate emailPredicate=criteriaBuilder.like(root.get("email"), "%"+email+"%");
        Predicate rolePredicate = criteriaBuilder.like(root.get("role"),"%"+role+"%");

//        Predicate orPredicate = criteriaBuilder.or(namePredicate,emailPredicate,rolePredicate);
          Predicate namefindPredicate = criteriaBuilder.or(namePredicate);

        // => final query ==>select * from employee where name like %ajay%

        //or email like %email%

//        criteriaQuery.where(
//                criteriaBuilder.and(orPredicate,emailPredicate)
//        );

       var andEmailPredicate = criteriaBuilder.and(namefindPredicate,emailPredicate);
       criteriaQuery.where(andEmailPredicate);

        TypedQuery<RegistrationModel> query=em.createQuery(criteriaQuery);

        return query.getResultList();

    }

    public  List<RegistrationModel> findAllCreteria(
            SearchRequest request
    ){
        CriteriaBuilder criteriaBuilder= em.getCriteriaBuilder();
        CriteriaQuery<RegistrationModel> criteriaQuery= criteriaBuilder.createQuery(RegistrationModel.class);
        List<Predicate> predicates= new ArrayList<>();
        // select from Users

        Root<RegistrationModel> root=criteriaQuery.from(RegistrationModel.class);
        if (request.getName()!=null){
            Predicate namePredicate= criteriaBuilder
                    .like(root.get("name"),"%"+request.getName()+"%");
            predicates.add(namePredicate);
        }
        if (request.getEmail()!=null){
            Predicate emailPredicate= criteriaBuilder
                    .like(root.get("email"),"%"+request.getEmail()+"%");
            predicates.add(emailPredicate);
        }

        if (request.getRole()!=null){
            Predicate rolePredicate= criteriaBuilder
                    .like(root.get("role"),"%"+request.getRole()+"%");
            predicates.add(rolePredicate);
        }

        criteriaQuery.where(
                criteriaBuilder.or(predicates.toArray(predicates.toArray(new Predicate[0])))
        );

        TypedQuery<RegistrationModel> query= em.createQuery(criteriaQuery);

        return query.getResultList();


    }
}
