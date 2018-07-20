package com.dextreem.gms.helper;

import java.io.File;
import java.net.URI;

/**
 * This class extends a normal file by a custom field for the filename.
 */
public class ImageFile extends File {

    private String imageFileName = "";

    public ImageFile(String pathname) {
        super(pathname);
    }

    public ImageFile(String parent, String child) {
        super(parent, child);
    }

    public ImageFile(File parent, String child) {
        super(parent, child);
    }

    public ImageFile(URI uri) {
        super(uri);
    }

    public String getImageFileName() {
        return imageFileName;
    }

    public void setImageFileName(String imageFileName) {
        this.imageFileName = imageFileName;
    }
}
