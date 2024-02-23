package com.findprecon.dao.projectSearch;


import com.findprecon.model.ProjectData;
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
public class ProjectSearchDao {


    private final EntityManager em;



    public List<ProjectData> findAllSimpleQuery(
            String projectName,
            String propertyType,
            String developer,
            String address,
//                Integer projectPhase,
            String DeveloperEmail
    ){
        CriteriaBuilder criteriaBuilder= em.getCriteriaBuilder();
        CriteriaQuery<ProjectData> criteriaQuery=criteriaBuilder.createQuery(ProjectData.class);



//        select from ProjectData

        Root<ProjectData> root =criteriaQuery.from(ProjectData.class);

        //prepare WHERE clause
        //WHERE name like %ajay%


        Predicate projectNamePredicate= criteriaBuilder.like(root.get("projectName"), "%"+projectName+"%");
        Predicate DeveloperEmailPredicate=criteriaBuilder.like(root.get("email"), "%"+DeveloperEmail+"%");
        Predicate addressPredicate = criteriaBuilder.like(root.get("address"),"%"+address+"%");
        Predicate propertyTypePredicate = criteriaBuilder.like(root.get("propertyType"),"%"+propertyType+"%");
        Predicate developerPredicate = criteriaBuilder.like(root.get("developer"),"%"+developer+"%");
//            Predicate projectPhasePredicate = criteriaBuilder.like(root.get("projectPhase"),"%"+projectPhase+"%");



//        Predicate orPredicate = criteriaBuilder.or(namePredicate,emailPredicate,rolePredicate);
        Predicate projectNamefindPredicate = criteriaBuilder.or(projectNamePredicate);

        // => final query ==>select * from employee where name like %ajay%

        //or email like %email%

//        criteriaQuery.where(
//                criteriaBuilder.and(orPredicate,emailPredicate)
//        );

        var andEmailPredicate = criteriaBuilder.and(projectNamefindPredicate,DeveloperEmailPredicate);
        criteriaQuery.where(andEmailPredicate);

        TypedQuery<ProjectData> query=em.createQuery(criteriaQuery);

        return query.getResultList();

    }

    public List<ProjectData> findAllCreteria(ProjectSearchRequest request) {
        CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
        CriteriaQuery<ProjectData> criteriaQuery = criteriaBuilder.createQuery(ProjectData.class);
        List<Predicate> predicates = new ArrayList<>();
        Root<ProjectData> root = criteriaQuery.from(ProjectData.class);

        if (request.getProjectName() != null) {
            predicates.add(criteriaBuilder.like(root.get("projectName"), "%" + request.getProjectName() + "%"));
        }
        if (request.getPropertyType() != null) {
            predicates.add(criteriaBuilder.like(root.get("propertyType"), "%" + request.getPropertyType() + "%"));
        }
        if (request.getDeveloper() != null) {
            predicates.add(criteriaBuilder.like(root.get("developer"), "%" + request.getDeveloper() + "%"));
        }
        if (request.getForntLotSize() != 0) {
            predicates.add(criteriaBuilder.like(root.get("forntLotSize"), "%" + request.getForntLotSize() + "%"));
        }
        if (request.getGarage() != 0) {
            predicates.add(criteriaBuilder.like(root.get("garage"), "%" + request.getGarage() + "%"));
        }
        if (request.getPropertyArea() != null) {
            predicates.add(criteriaBuilder.like(root.get("propertyArea"), "%" + request.getPropertyArea() + "%"));
        }
        if (request.getBasement() != null) {
            predicates.add(criteriaBuilder.like(root.get("basement"), "%" + request.getBasement() + "%"));
        }
        if (request.getPropClosingYear() != 0) {
            predicates.add(criteriaBuilder.like(root.get("propClosingYear"), "%" + request.getPropClosingYear() + "%"));
        }
        if (request.getBasementType() != null) {
            predicates.add(criteriaBuilder.like(root.get("basementType"), "%" + request.getBasementType() + "%"));
        }
        if (request.getTotalDeposit() != 0) {
            predicates.add(criteriaBuilder.like(root.get("totalDeposit"), "%" + request.getTotalDeposit() + "%"));
        }

        criteriaQuery.where(
                criteriaBuilder.and(predicates.toArray(new Predicate[0]))
        );

        TypedQuery<ProjectData> query = em.createQuery(criteriaQuery);

        return query.getResultList();
    }

}