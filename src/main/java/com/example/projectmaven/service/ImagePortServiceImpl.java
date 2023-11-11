package com.example.projectmaven.service;

import com.example.projectmaven.model.CategoryImagesDto;
import com.example.projectmaven.model.ContentDto;
import com.example.projectmaven.model.ImagePort;
import com.example.projectmaven.repository.ImagePortRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ImagePortServiceImpl implements ImagePortService {

    private final ImagePortRepository repository;

    private final Path pathMany = Paths.get("src/main/resources/static/storedImg/");
    private final Path pathRare = Paths.get("src/main/resources/static/mainImg/");


    @Autowired
    public ImagePortServiceImpl(ImagePortRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ImagePort> getMain() {
        ImagePort[] imagePortsArr = new ImagePort[15];
        for (int i = 0; i < imagePortsArr.length; i++) {
            imagePortsArr[i] = new ImagePort(String.valueOf(i), "Prázdné");
        }
        for (ImagePort x : repository.findAll()) {
            for (int i = 0; i < imagePortsArr.length; i++) {
                if (i == x.getImgIndex()) {
                    imagePortsArr[i] = x;
                }
            }

        }
        return List.of(imagePortsArr);
    }

    @Override
    public List<ImagePort> getAll() {
        return repository.findAll();
    }

    @Override
    public byte[] getImg(Long id) throws IOException {
        Optional<ImagePort> img = repository.findById(id);
        Path filePath = Path.of(img.get().getPathName());
        return Files.readAllBytes(new File(filePath.toUri()).toPath());
    }


    @Override
    public void deleteImg(Long id) throws IOException {
        if (repository.findById(id).isPresent()) {
            Files.deleteIfExists(Path.of(repository.findById(id).get().getPathName()));
            repository.delete(repository.findById(id).get());
        }
    }

    @Override
    public ImagePort addImg(String groupName, int index, String setName, MultipartFile file) throws IOException {
        Random random = new Random();
        int randomNum =  random.nextInt(9000) + 1000;
        Path filePath;
        if (Objects.equals(groupName, "main")) {
            filePath = Paths.get(String.valueOf(pathRare), file.getOriginalFilename());
        } else {
            filePath = Paths.get(String.valueOf(pathMany), file.getOriginalFilename() + " -- "
                    + new SimpleDateFormat("ddMMyyyy-HHmmss").format(new Date())
                    + "--" + randomNum);
        }


        file.transferTo(new File(filePath.toUri()));
        ImagePort img = new ImagePort();
        if (index == 100) {
            img.setName(file.getOriginalFilename() + " -- "
                    + new SimpleDateFormat("dd.MM. yyyy - HH:mm:ss").format(new Date())
                    + "--" + randomNum);
        } else {
            img.setName(index + "." + file.getOriginalFilename() + " -- "
                    + new SimpleDateFormat("dd.MM. yyyy - HH:mm:ss").format(new Date())
                    + "--" + randomNum);
        }
        img.setType(file.getContentType());
        img.setImgIndex(index);
        img.setPathName(String.valueOf(filePath));
        img.setCategoriesName(groupName);
        img.setSetName(setName);
        return repository.save(img);
    }


    @Override
    public String getType(Long id) {
        if (repository.findById(id).isPresent()) {
            return repository.findById(id).get().getType();
        } else {
            return "none";
        }
    }

    @Override
    public ImagePort getImgWithInfo(Long id) {
        if (repository.findById(id).isPresent()) {
            return repository.findById(id).get();
        } else {
            return null;
        }
    }

    @Override
    public ImagePort getImgByName(String name) {
        return repository.getImagePortBySetName(name);
    }

    @Override
    public Set<String> category() {
        Set<String> category = new HashSet<>();
        for (ImagePort img : repository.findAll()) {
            if (img.getImgIndex() < 99) {
                category.add(img.getSetName());
            }
        }
        return category;
    }

    @Override
    public ImagePort getImgByIndex(int index) {
        return repository.getImagePortByImgIndex(index);
    }

    @Override
    public void deleteImgByIndex(int index) {
        repository.deleteById(repository.getImagePortByImgIndex(index).getId());
    }

    @Override
    public List<CategoryImagesDto> getAllSetsImages() {
        List<ImagePort> allImages = repository.findAll();
        List<CategoryImagesDto> categoryImagesDto = new ArrayList<>();

        Set<String> setCategory = new HashSet<>();
        for (ImagePort imagePort: allImages) {
            if(!Objects.equals(imagePort.getCategoriesName(), "main")) {
                setCategory.add(imagePort.getCategoriesName());
            }
        }

        for (String s: setCategory) {
            categoryImagesDto.add(new CategoryImagesDto(s));
        }

        for (ImagePort imagePort : allImages) {
            for (CategoryImagesDto categoryImageDto:categoryImagesDto) {
                if(Objects.equals(categoryImageDto.getCategory(), imagePort.getCategoriesName())) {
                    categoryImageDto.addImage(imagePort);
                    break;
                }
            }
        }

        for (CategoryImagesDto cat: categoryImagesDto) {
            cat.sortImage();
        }
        return categoryImagesDto;
    }

    @Override
    public ImagePort getImgById(Long id) {
        return repository.getById(id);
    }

    @Override
    public List<Long> getAllIdSameSet(String setName, String categoryName) {
        List<Long> ids = new ArrayList<>();
        for (ImagePort img: repository.findAll()) {
            if(Objects.equals(img.getSetName(), setName)
                    && Objects.equals(img.getCategoriesName(), categoryName)) {
                ids.add(img.getId());
            }
        }
        return ids;
    }

    @Override
    public List<Long> getAllIdSameCategory(String categoryName) {
        List<Long> ids = new ArrayList<>();
        for (ImagePort img: repository.findAll()) {
            if(Objects.equals(img.getCategoriesName(), categoryName)) {
                ids.add(img.getId());
            }
        }
        return ids;
    }

    @Override
    public ContentDto fillImgByCategory(ContentDto contentDto, String category) {
        for (ImagePort img: repository.findAll()) {
            if(Objects.equals(img.getCategoriesName(), category)) {
                contentDto.addImg(img);
            }
        }
        contentDto.sortImage();
        return contentDto;
    }


}
